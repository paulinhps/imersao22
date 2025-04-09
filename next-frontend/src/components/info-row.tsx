import { cn } from "../lib/utils"

interface InfoRowProps {
  label: string
  value: string | number
  className?: string
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn("flex justify-between py-2 border-b border-border last:border-0", className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
