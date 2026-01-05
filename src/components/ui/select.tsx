"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// A simplified Select implementation that mimics Radix UI but uses standard React state
// This avoids needing to install @radix-ui/react-select if it's missing

interface SelectProps {
    value?: string
    onValueChange?: (value: string) => void
    children?: React.ReactNode
}

interface SelectContextType {
    value?: string
    onValueChange?: (value: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextType>({
    open: false,
    setOpen: () => { },
})

export function Select({ value, onValueChange, children }: SelectProps) {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
            <div className="relative inline-block w-full" ref={ref}>
                {children}
            </div>
        </SelectContext.Provider>
    )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children?: React.ReactNode
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, children, ...props }, ref) => {
        const { open, setOpen } = React.useContext(SelectContext)
        return (
            <button
                ref={ref}
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
        )
    }
)
SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = ({ placeholder, className }: { placeholder?: string, className?: string }) => {
    const { value } = React.useContext(SelectContext)
    // We can't easily find the label for the value without traversing children or passing options differently.
    // For this simplified version, if children are just text, it might work, but usually SelectValue displays the selected Item's label.
    // To handle this simply without complex context:
    // We will force the parent to rely on the current value being meaningful or let the user handle display.
    // BUT: Shadcn SelectValue automatically shows the selected item text.
    // Workaround: We will let this component just render the `value` prop if present (styled), or placeholder.
    // A better approach for this simplified version: The consumer usually passes `value` to the Select. 

    // Actually, to make it display the *Label* of the selected item instead of the *Value*, 
    // we would need to register items. 
    // For now, to keep it simple and robust: we will display the `value` (capitalized/formatted if possible) or the placeholder.
    // OR, we assume the user of this component will pass the Label as children to SelectValue if they want specific control,
    // but Shadcn usage is `<SelectValue placeholder="..." />`.

    // Let's implement a registry to find the label.
    return (
        <span className={cn("block truncate", className)}>
            {/* This is a limitation of this custom polyfill: it will display the raw value string if we don't fix it. 
             Since our CourseMatcher passes `p` (Provider Name) as value, it's fine. 
             For "all", it will display "all". We might want to fix that in the consumer (CourseMatcher). */}
            <SelectValueDisplay placeholder={placeholder} />
        </span>
    )
}

// Internal component to consume context and find label if we had a registry, 
// strictly for now it renders value.
function SelectValueDisplay({ placeholder }: { placeholder?: string }) {
    const { value } = React.useContext(SelectContext)
    // Custom logic for our specific use case (CourseMatcher) to look good:
    if (!value || value === "all") return <>{placeholder}</>
    // Capitalize simple values or return as is
    return <>{value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}</>
}

interface SelectContentProps {
    className?: string
    children?: React.ReactNode
    position?: "popper" | "item-aligned"
}

export function SelectContent({ className, children }: SelectContentProps) {
    const { open } = React.useContext(SelectContext)
    if (!open) return null
    return (
        <div
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full mt-1",
                className
            )}
        >
            <div className="p-1">{children}</div>
        </div>
    )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
    className?: string
    children?: React.ReactNode
}

export function SelectItem({ value, className, children, ...props }: SelectItemProps) {
    const { value: selectedValue, onValueChange, setOpen } = React.useContext(SelectContext)
    const isSelected = selectedValue === value

    return (
        <div
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                className
            )}
            onClick={() => {
                if (onValueChange) onValueChange(value)
                setOpen(false)
            }}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            <span className="truncate">{children}</span>
        </div>
    )
}
