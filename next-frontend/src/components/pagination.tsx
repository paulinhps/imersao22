import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
        className={cn(
          "p-2 rounded-md bg-secondary",
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary/80",
        )}
      >
        <ChevronLeft size={16} />
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md",
            currentPage === page ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80",
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
        className={cn(
          "p-2 rounded-md bg-secondary",
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary/80",
        )}
      >
        <ChevronRight size={16} />
      </Link>
    </div>
  )
}
