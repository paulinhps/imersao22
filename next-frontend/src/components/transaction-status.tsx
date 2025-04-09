import { CheckCircle } from "lucide-react"
import { cn } from "../lib/utils"

interface TransactionStatusItemProps {
  title: string
  date: string
  time: string
}

function TransactionStatusItem({ title, date, time }: TransactionStatusItemProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="mt-1">
        <CheckCircle className="text-green-500" size={20} />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">
          {date} {time}
        </p>
      </div>
    </div>
  )
}

export function TransactionStatus({ className }: { className?: string }) {
  return (
    <div className={cn("bg-card p-6 rounded-lg", className)}>
      <h2 className="text-xl font-bold mb-6">Status da Transação</h2>

      <TransactionStatusItem title="Fatura Criada" date="30/03/2025" time="14:30" />

      <TransactionStatusItem title="Pagamento Processado" date="30/03/2025" time="14:32" />

      <TransactionStatusItem title="Transação Aprovada" date="30/03/2025" time="14:35" />
    </div>
  )
}
