"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { cn } from "../lib/utils"

interface HeaderProps {
  username?: string
  showUserInfo?: boolean
}

export function Header({ username = "usuário", showUserInfo = true }: HeaderProps) {
  return (
    <header className={cn("w-full bg-card border-b border-border py-4 px-6")}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/faturas" className="text-xl font-bold">
          Full Cycle Gateway
        </Link>
        {showUserInfo && (
          <div className="flex items-center gap-4">
            <span>Olá, {username}</span>
            <button
              className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-md transition-colors"
              onClick={() => (window.location.href = "/auth")}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
