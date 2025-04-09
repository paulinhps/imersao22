import type React from "react"
import { cn } from "../lib/utils"

interface InfoCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <div className={cn("bg-card p-6 rounded-lg", className)}>
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  )
}
