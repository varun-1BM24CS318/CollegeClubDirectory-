"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onOpenChange
 * @param {Object} [props.club]
 */
export function ClubModal({ open, onOpenChange, club }) {
  if (!club) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-balance">{club.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{club.category}</Badge>
            <Badge>{club.membershipType}</Badge>
          </div>

          <p className="text-sm text-muted-foreground">{club.fullDescription}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-medium">Meeting Times</h4>
              <p className="text-sm text-muted-foreground">{club.meetingTimes}</p>
            </div>
            <div>
              <h4 className="font-medium">Contact</h4>
              <ul className="text-sm text-muted-foreground">
                <li>
                  <a className="underline underline-offset-4" href={`mailto:${club.email}`}>
                    {club.email}
                  </a>
                </li>
                {club.social?.website && (
                  <li>
                    <a
                      className="underline underline-offset-4"
                      href={club.social.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  </li>
                )}
                {club.social?.twitter && (
                  <li>
                    <a
                      className="underline underline-offset-4"
                      href={club.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                )}
                {club.social?.instagram && (
                  <li>
                    <a
                      className="underline underline-offset-4"
                      href={club.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {club.events?.length ? (
            <div className="space-y-2">
              <h4 className="font-medium">Upcoming Events</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {club.events.map((e, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <span>{e.title}</span>
                    <span className="text-xs">
                      {e.date} — {e.location}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {club.images?.length ? (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {club.images.map((src, i) => (
                  <img
                    key={i}
                    src={src || "/placeholder.svg"}
                    alt={`Gallery image ${i + 1} for ${club.name}`}
                    className="h-24 w-full rounded-md border object-cover"
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
