import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("renders with primary variant by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("fui-button");
  });

  it("renders with secondary intent variant", () => {
    render(
      <Button visual="solid" intent="secondary">
        Secondary
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with small size", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with medium size", () => {
    render(<Button size="md">Medium</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles click events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    button.click();
    expect(clicked).toBe(true);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("forwards additional props", () => {
    render(<Button data-testid="custom-button">Test</Button>);
    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
  });
});
