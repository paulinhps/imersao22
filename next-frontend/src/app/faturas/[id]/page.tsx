"use client"

import Link from "next/link"
import { Header } from "../../../components/header"
import { InfoCard } from "../../../components/info-card"
import { InfoRow } from "../../../components/info-row"
import { TransactionStatus } from "../../../components/transaction-status"
import { ArrowLeft, Download } from "lucide-react"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  const invoiceId = `#${params.id}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Link href="/faturas" className="flex items-center gap-1 text-gray-400 hover:text-white">
                  {" "}
                  {/* Alterado para /faturas */}
                  <ArrowLeft size={16} />
                  Voltar
                </Link>

                <h1 className="text-2xl font-bold">Fatura {invoiceId}</h1>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Aprovado</span>
              </div>

              <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md transition-colors">
                <Download size={16} />
                Download PDF
              </button>
            </div>

            <p className="text-gray-400 mb-6">Criada em 30/03/2025 às 14:30</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard title="Informações da Fatura">
                <div className="space-y-2">
                  <InfoRow label="ID da Fatura" value={invoiceId} />
                  <InfoRow label="Valor" value="R$ 1.500,00" />
                  <InfoRow label="Data de Criação" value="30/03/2025 14:30" />
                  <InfoRow label="Última Atualização" value="30/03/2025 14:35" />
                  <InfoRow label="Descrição" value="Compra Online #123" />
                </div>
              </InfoCard>

              <TransactionStatus />

              <InfoCard title="Método de Pagamento">
                <div className="space-y-2">
                  <InfoRow label="Tipo" value="Cartão de Crédito" />
                  <InfoRow label="Últimos Dígitos" value="**** **** **** 1234" />
                  <InfoRow label="Titular" value="João da Silva" />
                </div>
              </InfoCard>

              <InfoCard title="Dados Adicionais">
                <div className="space-y-2">
                  <InfoRow label="ID da Conta" value="ACC-12345" />
                  <InfoRow label="IP do Cliente" value="192.168.1.1" />
                  <InfoRow label="Dispositivo" value="Desktop - Chrome" />
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
