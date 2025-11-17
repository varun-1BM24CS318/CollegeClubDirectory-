"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * @param {Object} props
 * @param {string} props.query
 * @param {Function} props.setQuery
 * @param {string} props.category
 * @param {Function} props.setCategory
 * @param {string} props.membership
 * @param {Function} props.setMembership
 * @param {string[]} props.categories
 * @param {string[]} props.memberships
 */
export function SearchFilters({
  query,
  setQuery,
  category,
  setCategory,
  membership,
  setMembership,
  categories,
  memberships,
}) {
  return (
    <section aria-label="Search and filters" className="rounded-lg border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">Search by name</Label>
          <Input id="search" placeholder="e.g., Robotics" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Membership</Label>
          <Select value={membership} onValueChange={setMembership}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select membership" />
            </SelectTrigger>
            <SelectContent>
              {memberships.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
