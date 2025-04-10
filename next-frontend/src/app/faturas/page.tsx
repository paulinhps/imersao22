"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../../components/header"
import { Download, Eye, Plus } from "lucide-react"
import { DatePicker } from "@/components/date-picker"
import { StatusBadge } from "@/components/status-badge"
import { Pagination } from "@/components/pagination"

const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "Aprovado" as const,
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "Pendente" as const,
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "Rejeitado" as const,
  },
]

export default function FaturasPage() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [status, setStatus] = useState<string>("Todos")
  const [searchTerm, setSearchTerm] = useState<string>("")

  return (
    <div className="min-h-screen flex flex-col">
      <Header showUserInfo={true} />

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Faturas</h1>
                <p className="text-muted-foreground">Gerencie suas faturas e acompanhe os pagamentos</p>
              </div>
              <Link
                href="/faturas/nova"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
              >
                <Plus size={16} />
                Nova Fatura
              </Link>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Status</label>
                  <select
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Aprovado</option>
                    <option>Pendente</option>
                    <option>Rejeitado</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Data Inicial</label>
                  <DatePicker selectedDate={startDate} onChange={setStartDate} />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Data Final</label>
                  <DatePicker selectedDate={endDate} onChange={setEndDate} />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Buscar</label>
                  <input
                    type="text"
                    placeholder="ID ou descrição"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">DATA</th>
                    <th className="text-left py-3 px-4">DESCRIÇÃO</th>
                    <th className="text-left py-3 px-4">VALOR</th>
                    <th className="text-left py-3 px-4">STATUS</th>
                    <th className="text-right py-3 px-4">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">{invoice.id}</td>
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4">{invoice.description}</td>
                      <td className="py-3 px-4">{invoice.value}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/faturas/${invoice.id.replace("#", "")}`}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Eye size={18} />
                          </Link>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-400">Mostrando 1 - 3 de 50 resultados</div>
            <Pagination currentPage={1} totalPages={3} baseUrl="/faturas" />
          </div>
        </div>
      </main>
    </div>
  )
}
