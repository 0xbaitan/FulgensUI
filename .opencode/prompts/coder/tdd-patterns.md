# TDD Patterns & Examples

# Loaded: Phase 2-4 (TDD workflow)

# Practical examples of test-first development in React/TypeScript

version: 1.0

## Component Testing Patterns

### Pattern 1: UI Component (Toggle, Button, Input)

**Test Structure:**

```typescript
describe("ComponentName", () => {
  describe("Rendering", () => {
    // Default state tests
  });

  describe("Props", () => {
    // Prop validation tests
  });

  describe("User Interaction", () => {
    // Event handler tests
  });

  describe("Accessibility", () => {
    // ARIA and keyboard tests
  });

  describe("Edge Cases", () => {
    // Error states, boundaries
  });
});
```

**Example: Toggle Component**

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  describe("Rendering", () => {
    it("renders with default unchecked state", () => {
      render(<Toggle />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("aria-checked", "false");
    });

    it("renders with checked prop", () => {
      render(<Toggle checked />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("aria-checked", "true");
    });

    it("applies custom className", () => {
      render(<Toggle className="custom" />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveClass("custom");
    });
  });

  describe("Props", () => {
    it("accepts size variant prop", () => {
      render(<Toggle size="sm" />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toBeInTheDocument();
    });

    it("accepts data attributes", () => {
      render(<Toggle data-testid="my-toggle" />);
      const toggle = screen.getByTestId("my-toggle");
      expect(toggle).toBeInTheDocument();
    });
  });

  describe("User Interaction", () => {
    it("toggles state on click", () => {
      render(<Toggle />);
      const toggle = screen.getByRole("switch");

      expect(toggle).toHaveAttribute("aria-checked", "false");

      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-checked", "true");

      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-checked", "false");
    });

    it("calls onChange handler with new state", () => {
      const onChange = vi.fn();
      render(<Toggle onChange={onChange} />);
      const toggle = screen.getByRole("switch");

      fireEvent.click(toggle);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);

      fireEvent.click(toggle);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it("supports controlled mode", () => {
      const { rerender } = render(<Toggle checked={false} />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("aria-checked", "false");

      rerender(<Toggle checked={true} />);
      expect(toggle).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Accessibility", () => {
    it("has switch role", () => {
      render(<Toggle />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toBeInTheDocument();
    });

    it("is keyboard accessible", () => {
      render(<Toggle />);
      const toggle = screen.getByRole("switch");

      toggle.focus();
      expect(toggle).toHaveFocus();
    });

    it("announces state to screen readers", () => {
      render(<Toggle checked />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles disabled state", () => {
      render(<Toggle disabled />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toBeDisabled();
    });

    it("prevents interaction when disabled", () => {
      const onChange = vi.fn();
      render(<Toggle disabled onChange={onChange} />);
      const toggle = screen.getByRole("switch");

      fireEvent.click(toggle);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("handles missing onChange gracefully", () => {
      render(<Toggle />);
      const toggle = screen.getByRole("switch");

      expect(() => fireEvent.click(toggle)).not.toThrow();
    });
  });
});
```

---

### Pattern 2: Context Provider (ThemeProvider)

**Test Structure:**

```typescript
describe("Provider", () => {
  describe("Default State", () => {
    // Initial values
  });

  describe("State Updates", () => {
    // State change tests
  });

  describe("Side Effects", () => {
    // localStorage, API calls
  });

  describe("Error Handling", () => {
    // Edge cases, failures
  });
});
```

**Example: ThemeProvider**

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";

// Test component that uses useTheme
function TestComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("Default State", () => {
    it("provides light theme by default", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const theme = screen.getByTestId("theme");
      expect(theme).toHaveTextContent("light");
    });

    it("applies theme class to document", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement).toHaveClass("light");
    });
  });

  describe("State Updates", () => {
    it("updates theme on setTheme call", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole("button");
      const theme = screen.getByTestId("theme");

      fireEvent.click(button);
      expect(theme).toHaveTextContent("dark");
      expect(document.documentElement).toHaveClass("dark");
    });

    it("toggles between themes", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole("button");
      const theme = screen.getByTestId("theme");

      fireEvent.click(button);
      expect(theme).toHaveTextContent("dark");

      fireEvent.click(button);
      expect(theme).toHaveTextContent("light");
    });
  });

  describe("Side Effects", () => {
    it("persists theme to localStorage", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("loads theme from localStorage on mount", () => {
      localStorage.setItem("theme", "dark");

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const theme = screen.getByTestId("theme");
      expect(theme).toHaveTextContent("dark");
    });
  });

  describe("Error Handling", () => {
    it("handles missing localStorage gracefully", () => {
      const originalLocalStorage = window.localStorage;
      delete (window as any).localStorage;

      expect(() => {
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        );
      }).not.toThrow();

      (window as any).localStorage = originalLocalStorage;
    });

    it("throws error when useTheme used outside provider", () => {
      // Suppress console.error for this test
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useTheme must be used within ThemeProvider");

      spy.mockRestore();
    });
  });
});
```

---

### Pattern 3: Custom Hook (useTheme, useToggle)

**Test Structure:**

```typescript
describe("useHookName", () => {
  describe("Initial State", () => {
    // Default return values
  });

  describe("State Updates", () => {
    // State change behavior
  });

  describe("Side Effects", () => {
    // useEffect, subscriptions
  });

  describe("Cleanup", () => {
    // Memory leaks, subscriptions
  });
});
```

**Example: useTheme Hook**

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme, ThemeProvider } from "../useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Initial State", () => {
    it("returns light theme by default", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("light");
      expect(typeof result.current.setTheme).toBe("function");
    });

    it("loads theme from localStorage", () => {
      localStorage.setItem("theme", "dark");

      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("dark");
    });
  });

  describe("State Updates", () => {
    it("updates theme on setTheme call", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(result.current.theme).toBe("dark");
    });

    it("persists theme changes to localStorage", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  describe("Side Effects", () => {
    it("applies theme class to document", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("removes previous theme class", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme("dark");
      });

      expect(document.documentElement.classList.contains("light")).toBe(false);
    });
  });

  describe("Cleanup", () => {
    it("cleans up on unmount", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { unmount } = renderHook(() => useTheme(), { wrapper });

      unmount();

      // No memory leaks, no errors
      expect(() => unmount()).not.toThrow();
    });
  });
});
```

---

### Pattern 4: Utility Function (storage, formatDate)

**Test Structure:**

```typescript
describe("utilityFunction", () => {
  describe("Happy Path", () => {
    // Expected behavior
  });

  describe("Edge Cases", () => {
    // Null, undefined, empty
  });

  describe("Error Handling", () => {
    // Failures, exceptions
  });

  describe("Boundary Conditions", () => {
    // Min, max, limits
  });
});
```

**Example: storage Utility**

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { storage } from "../storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("get", () => {
    describe("Happy Path", () => {
      it("retrieves string value from localStorage", () => {
        localStorage.setItem("key", JSON.stringify("value"));
        const result = storage.get("key");
        expect(result).toBe("value");
      });

      it("retrieves object value from localStorage", () => {
        const obj = { foo: "bar", nested: { baz: 123 } };
        localStorage.setItem("key", JSON.stringify(obj));
        const result = storage.get("key");
        expect(result).toEqual(obj);
      });

      it("retrieves array value from localStorage", () => {
        const arr = [1, 2, 3, "four"];
        localStorage.setItem("key", JSON.stringify(arr));
        const result = storage.get("key");
        expect(result).toEqual(arr);
      });
    });

    describe("Edge Cases", () => {
      it("returns default value if key missing", () => {
        const result = storage.get("missing", "default");
        expect(result).toBe("default");
      });

      it("returns null if key missing and no default", () => {
        const result = storage.get("missing");
        expect(result).toBeNull();
      });

      it("handles empty string key", () => {
        localStorage.setItem("", JSON.stringify("value"));
        const result = storage.get("");
        expect(result).toBe("value");
      });
    });

    describe("Error Handling", () => {
      it("handles JSON parse errors gracefully", () => {
        localStorage.setItem("key", "invalid json {");
        const result = storage.get("key", "fallback");
        expect(result).toBe("fallback");
      });

      it("returns null if localStorage unavailable", () => {
        const originalLocalStorage = window.localStorage;
        delete (window as any).localStorage;

        const result = storage.get("key");
        expect(result).toBeNull();

        (window as any).localStorage = originalLocalStorage;
      });

      it("handles getItem throwing error", () => {
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
          throw new Error("Storage error");
        });

        const result = storage.get("key", "fallback");
        expect(result).toBe("fallback");

        vi.restoreAllMocks();
      });
    });
  });

  describe("set", () => {
    describe("Happy Path", () => {
      it("stores string value in localStorage", () => {
        storage.set("key", "value");
        expect(localStorage.getItem("key")).toBe(JSON.stringify("value"));
      });

      it("stores object value in localStorage", () => {
        const obj = { foo: "bar" };
        storage.set("key", obj);
        expect(localStorage.getItem("key")).toBe(JSON.stringify(obj));
      });

      it("stores number value in localStorage", () => {
        storage.set("key", 42);
        expect(localStorage.getItem("key")).toBe(JSON.stringify(42));
      });

      it("stores boolean value in localStorage", () => {
        storage.set("key", true);
        expect(localStorage.getItem("key")).toBe(JSON.stringify(true));
      });
    });

    describe("Edge Cases", () => {
      it("handles null value", () => {
        storage.set("key", null);
        expect(localStorage.getItem("key")).toBe(JSON.stringify(null));
      });

      it("handles undefined value", () => {
        storage.set("key", undefined);
        expect(localStorage.getItem("key")).toBe(JSON.stringify(undefined));
      });

      it("overwrites existing value", () => {
        storage.set("key", "old");
        storage.set("key", "new");
        expect(storage.get("key")).toBe("new");
      });
    });

    describe("Error Handling", () => {
      it("handles localStorage unavailable", () => {
        const originalLocalStorage = window.localStorage;
        delete (window as any).localStorage;

        expect(() => storage.set("key", "value")).not.toThrow();

        (window as any).localStorage = originalLocalStorage;
      });

      it("handles setItem throwing error", () => {
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
          throw new Error("Storage full");
        });

        expect(() => storage.set("key", "value")).not.toThrow();

        vi.restoreAllMocks();
      });
    });
  });

  describe("remove", () => {
    it("removes value from localStorage", () => {
      localStorage.setItem("key", JSON.stringify("value"));
      storage.remove("key");
      expect(localStorage.getItem("key")).toBeNull();
    });

    it("handles removing non-existent key", () => {
      expect(() => storage.remove("missing")).not.toThrow();
    });

    it("handles localStorage unavailable", () => {
      const originalLocalStorage = window.localStorage;
      delete (window as any).localStorage;

      expect(() => storage.remove("key")).not.toThrow();

      (window as any).localStorage = originalLocalStorage;
    });
  });

  describe("clear", () => {
    it("clears all localStorage", () => {
      storage.set("key1", "value1");
      storage.set("key2", "value2");
      storage.clear();
      expect(localStorage.length).toBe(0);
    });

    it("handles localStorage unavailable", () => {
      const originalLocalStorage = window.localStorage;
      delete (window as any).localStorage;

      expect(() => storage.clear()).not.toThrow();

      (window as any).localStorage = originalLocalStorage;
    });
  });
});
```

---

## TDD Best Practices

### 1. Write Minimal Tests

**Bad:**

```typescript
it("does everything", () => {
  // 50 lines of test code testing 10 different things
});
```

**Good:**

```typescript
it("renders with default state", () => {
  render(<Toggle />);
  expect(screen.getByRole("switch")).toBeInTheDocument();
});

it("toggles on click", () => {
  render(<Toggle />);
  fireEvent.click(screen.getByRole("switch"));
  expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
});
```

### 2. Test Behavior, Not Implementation

**Bad:**

```typescript
it("calls useState with false", () => {
  // Testing internal implementation details
});
```

**Good:**

```typescript
it("renders unchecked by default", () => {
  // Testing observable behavior
  render(<Toggle />);
  expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
});
```

### 3. Use Descriptive Test Names

**Bad:**

```typescript
it("works", () => { ... });
it("test1", () => { ... });
```

**Good:**

```typescript
it("renders with default unchecked state", () => { ... });
it("calls onChange handler with new state on click", () => { ... });
```

### 4. Arrange-Act-Assert Pattern

```typescript
it("toggles state on click", () => {
  // Arrange: Set up test conditions
  render(<Toggle />);
  const toggle = screen.getByRole("switch");

  // Act: Perform action
  fireEvent.click(toggle);

  // Assert: Verify outcome
  expect(toggle).toHaveAttribute("aria-checked", "true");
});
```

### 5. Test Edge Cases

```typescript
describe("Edge Cases", () => {
  it("handles null onChange", () => {
    render(<Toggle onChange={null} />);
    expect(() => fireEvent.click(screen.getByRole("switch"))).not.toThrow();
  });

  it("handles undefined checked prop", () => {
    render(<Toggle checked={undefined} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(<Toggle>{undefined}</Toggle>);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });
});
```

---

## Summary

**TDD Workflow:**

1. Write failing test (RED)
2. Implement minimal code (GREEN)
3. Refactor if needed (REFACTOR)
4. Repeat for each behavior

**Test Coverage Goals:**

- Branch: ≥90%
- Line: ≥90%
- Function: ≥90%
- Statement: ≥90%

**Test Organization:**

- Group by feature (Rendering, Interaction, etc.)
- Start with happy path
- Add edge cases
- Include error handling

**Avoid:**

- Testing implementation details
- Testing multiple things in one test
- Skipping edge cases
- Writing tests after code
