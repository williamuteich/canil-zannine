import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            className="h-9 px-3 rounded-lg bg-white text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm border-0"
          />
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink 
            href="#" 
            className="h-8 w-8 rounded-lg bg-white text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm border-0"
          >
            1
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink 
            href="#" 
            isActive
            className="h-8 w-8 rounded-lg bg-linear-to-r from-slate-800 to-slate-700 text-white transition-all duration-200 shadow-sm border-0 hover:from-slate-700 hover:to-slate-600"
          >
            2
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink 
            href="#" 
            className="h-8 w-8 rounded-lg bg-white text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm border-0"
          >
            3
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationEllipsis className="text-slate-400" />
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            className="h-9 px-3 rounded-lg bg-white text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm border-0"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}