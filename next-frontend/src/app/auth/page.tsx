"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../../components/header"
import { Info } from "lucide-react"

// Função para formatar a API key como GUID (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)
const formatApiKey = (value: string): string => {
  // Remove caracteres não alfanuméricos
  const cleanValue = value.replace(/[^A-Za-z0-9]/g, "")

  // Converte para caixa alta
  const upperValue = cleanValue.toUpperCase()

  // Limita a 32 caracteres (tamanho de um GUID sem hífens)
  const limitedValue = upperValue.slice(0, 32)

  // Adiciona hífens no formato GUID
  let formattedValue = ""
  if (limitedValue.length > 0) {
    formattedValue = limitedValue.slice(0, Math.min(8, limitedValue.length))

    if (limitedValue.length > 8) {
      formattedValue += "-" + limitedValue.slice(8, Math.min(12, limitedValue.length))
    }

    if (limitedValue.length > 12) {
      formattedValue += "-" + limitedValue.slice(12, Math.min(16, limitedValue.length))
    }

    if (limitedValue.length > 16) {
      formattedValue += "-" + limitedValue.slice(16, Math.min(20, limitedValue.length))
    }

    if (limitedValue.length > 20) {
      formattedValue += "-" + limitedValue.slice(20, Math.min(32, limitedValue.length))
    }
  }

  return formattedValue
}

export default function AuthPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatApiKey(e.target.value)
    setApiKey(formattedValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim() && apiKey.length === 36) {
      // Comprimento de um GUID formatado
      router.push("/faturas")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showUserInfo={false} />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Autenticação Gateway</h1>
          <p className="text-muted-foreground text-center mb-6">Insira sua API Key para acessar o sistema</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="apiKey" className="block mb-2">
                API Key
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="apiKey"
                  placeholder="Digite sua API Key"
                  className="flex-1 bg-background border border-input rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 rounded-r-md transition-colors"
                  disabled={apiKey.length < 36}
                >
                  →
                </button>
              </div>
            </div>
          </form>

          <div className="bg-accent rounded-md p-4 mt-6">
            <div className="flex gap-3">
              <div className="mt-1">
                <Info className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Como obter uma API Key?</h3>
                <p className="text-muted-foreground text-sm">
                  Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                  suporte para mais informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
