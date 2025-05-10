import * as React from "react";
import { Slottable } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants, Icons } from "@components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const LoadingButton: React.FC<ButtonProps> = ({
  className,
  loading = false,
  children,
  disabled,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <Icons type="refresh" className="mr-2 h-5 w-5 animate-spin" />
      )}
      <Slottable>{children}</Slottable>
    </Button>
  );
};

export { LoadingButton };
