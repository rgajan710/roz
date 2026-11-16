import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("button", {
  variants: { variant: { light: "button-light", dark: "button-dark", outline: "button-outline", coral: "button-coral" } },
  defaultVariants: { variant: "light" },
});

export function Button({ className, variant, asChild, ...props }: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant }), className)} {...props} />;
}
