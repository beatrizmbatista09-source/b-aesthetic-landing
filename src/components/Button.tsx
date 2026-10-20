import { Slot } from "@radix-ui/react-slot";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "salon" | "salonOutline";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant = "salon", ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    const variantClass = variant === "salonOutline" ? "salon-button-outline" : "salon-button-solid";

    return (
      <Component
        className={["salon-button", variantClass, className].filter(Boolean).join(" ")}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
