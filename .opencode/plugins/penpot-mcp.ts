import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import { existsSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import process from "process";

const PENPOT_MCP_PATH = join(process.cwd(), "vendor", "penpot-mcp");
const PID_FILE = join(dirname(process.cwd()), ".opencode", "penpot-mcp.pid");

function getPid(): number | null {
  try {
    if (existsSync(PID_FILE)) {
      const pid = parseInt(readFileSync(PID_FILE, "utf-8").trim(), 10);
      try {
        process.kill(pid, 0);
        return pid;
      } catch {
        unlinkSync(PID_FILE);
        return null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

function savePid(pid: number): void {
  writeFileSync(PID_FILE, pid.toString());
}

function clearPid(): void {
  try {
    if (existsSync(PID_FILE)) {
      unlinkSync(PID_FILE);
    }
  } catch {}
}

async function isServerRunning(): Promise<boolean> {
  const pid = getPid();
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    clearPid();
    return false;
  }
}

async function startServer(): Promise<string> {
  const alreadyRunning = await isServerRunning();
  if (alreadyRunning) {
    return "Penpot MCP server is already running";
  }

  try {
    const proc = Bun.spawn(["pnpm", "run", "start"], {
      cwd: PENPOT_MCP_PATH,
      stdout: "pipe",
      stderr: "pipe",
      detached: true,
    });

    savePid(proc.pid);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 3000);
    });

    const running = await isServerRunning();
    if (running) {
      return `Penpot MCP server started with PID ${proc.pid}`;
    } else {
      clearPid();
      return "Penpot MCP server failed to start";
    }
  } catch (err) {
    clearPid();
    return `Failed to start Penpot MCP server: ${err}`;
  }
}

async function stopServer(): Promise<string> {
  const pid = getPid();
  if (!pid) {
    return "Penpot MCP server is not running";
  }

  try {
    process.kill(pid, "SIGTERM");
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
    clearPid();
    return "Penpot MCP server stopped";
  } catch {
    clearPid();
    return "Failed to stop Penpot MCP server (process may have already exited)";
  }
}

async function restartServer(): Promise<string> {
  await stopServer();
  return startServer();
}

export const PenpotMcpPlugin: Plugin = async ({ directory }) => {
  return {
    session: {
      created: async () => {
        const running = await isServerRunning();
        if (!running) {
          await startServer();
        }
      },
    },
    tool: {
      penpot_mcp_status: tool({
        description: "Check if Penpot MCP server is running",
        args: {},
        async execute() {
          const running = await isServerRunning();
          const pid = getPid();
          if (running && pid) {
            return `Penpot MCP server is running (PID: ${pid})`;
          }
          return "Penpot MCP server is not running";
        },
      }),
      penpot_mcp_start: tool({
        description: "Start the Penpot MCP server",
        args: {},
        async execute() {
          return startServer();
        },
      }),
      penpot_mcp_stop: tool({
        description: "Stop the Penpot MCP server",
        args: {},
        async execute() {
          return stopServer();
        },
      }),
      penpot_mcp_restart: tool({
        description: "Restart the Penpot MCP server",
        args: {},
        async execute() {
          return restartServer();
        },
      }),
    },
  };
};
