"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from 'next/navigation'
import { ClubCard } from "@/components/club-card"
import { ClubModal } from "@/components/club-modal"
import { SearchFilters } from "@/components/search-filters"
import { clubs, categories, membershipTypes } from "@/lib/clubs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PAGE_SIZE = 8

export default function ClubsPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [membership, setMembership] = useState("All")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  // Filter clubs based on query/category/membership
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clubs.filter((c) => {
      const matchesQuery = q ? c.name.toLowerCase().includes(q) : true
      const matchesCategory = category === "All" ? true : c.category === category
      const matchesMembership = membership === "All" ? true : c.membershipType === membership
      return matchesQuery && matchesCategory && matchesMembership
    })
  }, [query, category, membership])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Reset to page 1 when filters change
  function handleFilterChange(setter) {
    return (v) => {
      setter(v)
      setPage(1)
    }
  }

  function openModal(club) {
    setSelected(club)
    setOpen(true)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <section className="mb-6">
        <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Explore Student Clubs</h1>
        <p className="text-pretty text-sm text-muted-foreground md:text-base">
          Browse clubs by category and membership. Use quick view or open a full details page.
        </p>
      </section>

      <SearchFilters
        query={query}
        setQuery={handleFilterChange(setQuery)}
        category={category}
        setCategory={handleFilterChange(setCategory)}
        membership={membership}
        setMembership={handleFilterChange(setMembership)}
        categories={categories}
        memberships={membershipTypes}
      />

      <section className="mt-6" aria-label="Club results">
        <p className="mb-3 text-sm text-muted-foreground">
          Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((club) => (
            <ClubCard key={club.id} club={club} onOpen={openModal} />
          ))}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="mt-6 flex justify-center">
            <Pagination aria-label="Pagination">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.max(1, p - 1))
                    }}
                    aria-disabled={page === 1}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages })
                  .slice(0, 3)
                  .map((_, i) => {
                    const index = i + 1
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          isActive={page === index}
                          onClick={(e) => {
                            e.preventDefault()
                            setPage(index)
                          }}
                        >
                          {index}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                {totalPages > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={page === totalPages}
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(totalPages)
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.min(totalPages, p + 1))
                    }}
                    aria-disabled={page === totalPages}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      <ClubModal open={open} onOpenChange={setOpen} club={selected} />
    </main>
  )
}
