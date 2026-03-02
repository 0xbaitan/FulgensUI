import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    _active: {
      transform: "translateY(0)",
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "#646cff",
        color: "white",
      },
      secondary: {
        border: "2px solid {colors.blue.400}",
        backgroundColor: "#f9f9f9",
        color: "#213547",
      },
    },
    size: {
      sm: {
        padding: "8px 16px",
        fontSize: "14px",
      },
      md: {
        padding: "12px 24px",
        fontSize: "16px",
      },
      lg: {
        padding: "16px 32px",
        fontSize: "18px",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
