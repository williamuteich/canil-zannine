"use client"

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationDemoProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export function PaginationDemo({ currentPage, totalPages, className = "" }: PaginationDemoProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={`h-9 px-3 rounded-lg bg-white text-slate-700 transition-all duration-200 shadow-sm border-0 cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="text-slate-400" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className={`h-8 w-8 rounded-lg transition-all duration-200 shadow-sm border-0 cursor-pointer ${currentPage === page
                    ? 'bg-linear-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={`h-9 px-3 rounded-lg bg-white text-slate-700 transition-all duration-200 shadow-sm border-0 cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}