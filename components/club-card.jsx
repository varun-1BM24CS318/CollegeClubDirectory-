"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * @param {Object} props
 * @param {Object} props.club
 * @param {Function} [props.onOpen]
 */
export function ClubCard({ club, onOpen }) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3">
        <img
          src={club.logoUrl || "/placeholder.svg"}
          alt={`${club.name} logo`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-md border object-cover"
        />
        <div className="flex-1">
          <CardTitle className="text-base">{club.name}</CardTitle>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{club.category}</Badge>
            <Badge>{club.membershipType}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{club.shortDescription}</p>
        <div className="flex items-center gap-2">
          <button
            className="text-sm underline underline-offset-4 hover:text-primary"
            onClick={() => onOpen?.(club)}
            aria-label={`Quick view ${club.name}`}
          >
            Quick view
          </button>
          <span className="text-muted-foreground">•</span>
          <Link
            className="text-sm underline underline-offset-4 hover:text-primary"
            href={`/clubs/${club.slug}`}
            aria-label={`View details page for ${club.name}`}
          >
            View details
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
