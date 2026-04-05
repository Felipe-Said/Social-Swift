import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-pill inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lg:rounded-[8px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 lg:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/92 lg:shadow-none",
        outline:
          "border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface-solid))] text-foreground hover:bg-[hsl(var(--accent))] hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-[hsl(var(--accent))] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 lg:h-9 lg:px-3.5",
        sm: "h-9 px-3.5 text-[13px] lg:h-8 lg:px-3",
        lg: "h-12 px-6 text-[15px] lg:h-10 lg:px-4",
        icon: "h-11 w-11 rounded-full lg:h-9 lg:w-9 lg:rounded-full",
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
