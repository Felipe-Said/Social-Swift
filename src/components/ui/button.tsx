import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[0.75rem] font-normal leading-[1.2] ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "gap-2 rounded-[0.875rem] border border-white/30 bg-white px-4 py-1 text-black shadow-[var(--button-shell)] hover:gap-3",
        destructive:
          "gap-2 rounded-[0.875rem] bg-destructive px-4 py-1 text-destructive-foreground shadow-[var(--button-shell)] hover:gap-3",
        outline:
          "gap-2 rounded-[0.875rem] border border-white/30 bg-white px-4 py-1 text-black shadow-[var(--button-shell)] hover:gap-3",
        secondary:
          "h-8 w-full justify-center rounded-md bg-[image:var(--primary-gradient-strong)] px-3 py-1 text-white shadow-none",
        ghost: "h-auto justify-start gap-2 rounded-md bg-transparent px-0 py-0 text-foreground shadow-none hover:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 min-w-[9rem]",
        sm: "h-8 min-w-[7.5rem]",
        lg: "h-9 min-w-[10rem]",
        icon: "h-9 w-9 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
