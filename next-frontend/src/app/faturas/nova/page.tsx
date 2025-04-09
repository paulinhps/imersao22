"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../../../components/header"
import { CreditCard, Lock } from "lucide-react"

// Funções de formatação
const formatCurrency = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "")

  // Converte para número e divide por 100 para obter o valor com centavos
  const floatValue = Number.parseInt(numericValue || "0", 10) / 100

  // Formata o valor para o padrão brasileiro (com vírgula)
  return floatValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatCardNumber = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "")

  // Limita a 16 dígitos
  const limitedValue = numericValue.slice(0, 16)

  // Adiciona espaços a cada 4 dígitos
  const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, "$1 ")

  return formattedValue
}

const formatExpiryDate = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "")

  // Limita a 4 dígitos
  const limitedValue = numericValue.slice(0, 4)

  // Adiciona a barra após os primeiros 2 dígitos (mês)
  if (limitedValue.length > 2) {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`
  }

  return limitedValue
}

const formatCVV = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "")

  // Limita a 3 dígitos
  return numericValue.slice(0, 3)
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  const [subtotal, setSubtotal] = useState("0,00")
  const [fee, setFee] = useState("0,00")
  const [total, setTotal] = useState("0,00")

  // Manipuladores de eventos com formatação
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value)
    setAmount(formattedValue)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setExpiryDate(formattedValue)
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCVV(e.target.value)
    setCvv(formattedValue)
  }

  const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Converte para caixa alta
    const upperCaseValue = e.target.value.toUpperCase()
    setCardholderName(upperCaseValue)
  }

  useEffect(() => {
    if (amount) {
      // Extrai apenas os números para cálculo
      const numericAmount = Number.parseFloat(amount.replace(/\./g, "").replace(",", "."))

      if (!isNaN(numericAmount)) {
        const calculatedFee = numericAmount * 0.02
        const calculatedTotal = numericAmount + calculatedFee

        // Formata os valores para exibição
        setSubtotal(numericAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 }))
        setFee(calculatedFee.toLocaleString("pt-BR", { minimumFractionDigits: 2 }))
        setTotal(calculatedTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 }))
      }
    } else {
      setSubtotal("0,00")
      setFee("0,00")
      setTotal("0,00")
    }
  }, [amount])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de processamento
    router.push("/faturas") // Alterado para /faturas
  }

  const handleCancel = () => {
    router.push("/faturas") // Alterado para /faturas
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
              <p className="text-gray-400">Preencha os dados abaixo para processar um novo pagamento</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block mb-2">
                      Valor
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                      <input
                        type="text"
                        id="amount"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="0,00"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Descreva o motivo do pagamento"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Dados do Cartão</h2>

                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block mb-2">
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="expiryDate" className="block mb-2">
                        Data de Expiração
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="123"
                        value={cvv}
                        onChange={handleCVVChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cardholderName" className="block mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="COMO APARECE NO CARTÃO"
                      value={cardholderName}
                      onChange={handleCardholderNameChange}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-6 mb-6">
                <div className="flex justify-between py-2 border-b border-slate-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-600">
                  <span>Taxa de Processamento (2%)</span>
                  <span>R$ {fee}</span>
                </div>

                <div className="flex justify-between py-4 font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total}</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center gap-2"
                >
                  <Lock size={16} />
                  Processar Pagamento
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 py-4 px-6 text-center text-gray-400 text-sm">
        © 2025 Full Cycle Gateway. Todos os direitos reservados.
      </footer>
    </div>
  )
}
