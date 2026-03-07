// Test Template for @coder Agent
// This template demonstrates TDD patterns with Vitest + React Testing Library

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "../component-name";

describe("ComponentName", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<ComponentName>Content</ComponentName>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className from recipe", () => {
      const { container } = render(
        <ComponentName variant="primary">Content</ComponentName>,
      );
      expect(container.firstChild).toHaveClass("componentName");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      render(<ComponentName variant="primary">Primary</ComponentName>);
      expect(screen.getByText("Primary")).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      render(<ComponentName variant="secondary">Secondary</ComponentName>);
      expect(screen.getByText("Secondary")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<ComponentName size="sm">Small</ComponentName>);
      expect(screen.getByText("Small")).toBeInTheDocument();
    });

    it("renders medium size", () => {
      render(<ComponentName size="md">Medium</ComponentName>);
      expect(screen.getByText("Medium")).toBeInTheDocument();
    });
  });

  describe("User Interaction", () => {
    it("handles click events", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ComponentName onClick={handleClick}>Click me</ComponentName>);
      await user.click(screen.getByText("Click me"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ComponentName onClick={handleClick}>Accessible</ComponentName>);

      const component = screen.getByText("Accessible");
      component.focus();
      expect(component).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<ComponentName />);
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it("handles very long content", () => {
      const longContent = "A".repeat(1000);
      render(<ComponentName>{longContent}</ComponentName>);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });
});
