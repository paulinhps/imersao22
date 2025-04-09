"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../../components/header"
import { Info } from "lucide-react"

export default function AuthPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      router.push("/faturas")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Autenticação Gateway</h1>
          <p className="text-gray-400 text-center mb-6">Insira sua API Key para acessar o sistema</p>

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
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-md transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </form>

          <div className="bg-gray-700 rounded-md p-4 mt-6">
            <div className="flex gap-3">
              <div className="mt-1">
                <Info className="text-indigo-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Como obter uma API Key?</h3>
                <p className="text-gray-400 text-sm">
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
