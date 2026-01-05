import { cn } from "@/lib/utils"

type ImagePlaceholderProps = {
  className?: string
  label?: string
  rounded?: boolean
}

export function ImagePlaceholder({ className, label = "IMAGE", rounded = false }: ImagePlaceholderProps) {
  return (
    <div
      aria-label={label}
      className={cn(
        "flex items-center justify-center border border-dashed border-muted-foreground/40 bg-muted/30 text-muted-foreground/60",
        rounded ? "rounded-full" : "rounded-xl",
        className
      )}
    >
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </div>
  )
}

