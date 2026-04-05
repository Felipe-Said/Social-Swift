import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-pill inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[999px] text-sm font-semibold tracking-[-0.02em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_12px_28px_hsl(var(--brand)/0.34)] hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_16px_36px_hsl(var(--brand)/0.42)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_12px_28px_hsl(var(--destructive)/0.28)] hover:-translate-y-0.5 hover:bg-destructive/92",
        outline:
          "border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface-solid)/0.5)] text-foreground shadow-[inset_0_1px_0_hsl(var(--hairline))] hover:-translate-y-0.5 hover:bg-[hsl(var(--surface-solid)/0.72)] hover:text-accent-foreground",
        secondary:
          "bg-secondary/90 text-secondary-foreground shadow-[inset_0_1px_0_hsl(var(--hairline))] hover:-translate-y-0.5 hover:bg-secondary",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-[hsl(var(--surface-solid)/0.46)] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-11 w-11 rounded-full",
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
