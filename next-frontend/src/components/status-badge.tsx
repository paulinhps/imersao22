import { cn } from "../lib/utils"

interface StatusBadgeProps {
  status: "Aprovado" | "Pendente" | "Rejeitado"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusClass = () => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusClass())}>{status}</span>
}
