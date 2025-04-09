"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"

interface DatePickerProps {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  className?: string
}

// Nomes dos meses em português
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

// Nomes dos dias da semana em português
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export function DatePicker({ selectedDate, onChange, placeholder = "dd/mm/aaaa", className = "" }: DatePickerProps) {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const datePickerRef = useRef<HTMLDivElement>(null)

  // Formatar a data para exibição no input
  useEffect(() => {
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const year = selectedDate.getFullYear()
      setInputValue(`${day}/${month}/${year}`)

      // Atualiza o mês exibido no calendário para o mês da data selecionada
      setCurrentMonth(new Date(selectedDate))
    } else {
      setInputValue("")
    }
  }, [selectedDate])

  // Fechar o datepicker quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Validar e formatar a entrada do usuário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Permitir apenas números e barras
    const formattedValue = value.replace(/[^\d/]/g, "")

    // Adicionar barras automaticamente
    let finalValue = formattedValue
    if (formattedValue.length === 2 && !formattedValue.includes("/") && inputValue.length !== 3) {
      finalValue = `${formattedValue}/`
    } else if (formattedValue.length === 5 && formattedValue.indexOf("/") === 2 && inputValue.length !== 6) {
      finalValue = `${formattedValue}/`
    }

    setInputValue(finalValue)

    // Converter para objeto Date se o formato estiver completo
    if (finalValue.length === 10) {
      const [day, month, year] = finalValue.split("/").map(Number)
      const date = new Date(year, month - 1, day)

      // Verificar se a data é válida
      if (!isNaN(date.getTime())) {
        onChange(date)
      }
    }
  }

  const handleClear = () => {
    setInputValue("")
    onChange(null)
  }

  const handleDateClick = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Gerar os dias do calendário
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1)
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0)

    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Total de dias no mês
    const daysInMonth = lastDay.getDate()

    // Array para armazenar todos os dias a serem exibidos
    const days: (Date | null)[] = []

    // Adicionar dias vazios para preencher o início do calendário
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="relative" ref={datePickerRef}>
      <div className={cn("relative w-full bg-card border border-input rounded-md", className)}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
          maxLength={10}
          onClick={() => setIsOpen(true)}
        />
        <CalendarIcon
          size={18}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {inputValue && (
        <button
          type="button"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        >
          ×
        </button>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-card border border-border rounded-md shadow-lg">
          <div className="p-2">
            {/* Cabeçalho do calendário */}
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
                onClick={handlePrevMonth}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="font-medium">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button
                type="button"
                className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
                onClick={handleNextMonth}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="h-8" />
                }

                const isSelected =
                  selectedDate &&
                  day.getDate() === selectedDate.getDate() &&
                  day.getMonth() === selectedDate.getMonth() &&
                  day.getFullYear() === selectedDate.getFullYear()

                const isToday =
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear()

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    className={cn(
                      "h-8 w-8 flex items-center justify-center rounded-full text-sm",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                      isToday && !isSelected ? "border border-primary" : "",
                    )}
                    onClick={() => handleDateClick(day)}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="border-t border-border p-2 flex justify-between">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                onChange(new Date())
                setIsOpen(false)
              }}
            >
              Hoje
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
