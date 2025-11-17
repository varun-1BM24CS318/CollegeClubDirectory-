import { notFound } from "next/navigation"
import { clubs } from "@/lib/clubs"

export default function ClubDetailPage({ params }) {
  const club = clubs.find((c) => c.slug === params.slug)
  if (!club) return notFound()

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <a href="/" className="underline underline-offset-4 hover:text-primary">
          Home
        </a>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{club.name}</span>
      </nav>

      <header className="mb-6">
        <div className="flex items-center gap-3">
          <img
            src={club.logoUrl || "/placeholder.svg"}
            alt={`${club.name} logo`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-md border object-cover"
          />
          <div>
            <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{club.name}</h1>
            <p className="text-sm text-muted-foreground">
              {club.category} • {club.membershipType}
            </p>
          </div>
        </div>
      </header>

      <section className="prose max-w-none prose-p:leading-relaxed">
        <p>{club.fullDescription}</p>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-lg font-medium">Meeting Times</h2>
          <p className="text-sm text-muted-foreground">{club.meetingTimes}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-lg font-medium">Contact</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <a className="underline underline-offset-4" href={`mailto:${club.email}`}>
                {club.email}
              </a>
            </li>
            {club.social?.website && (
              <li>
                <a className="underline underline-offset-4" href={club.social.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              </li>
            )}
            {club.social?.twitter && (
              <li>
                <a className="underline underline-offset-4" href={club.social.twitter} target="_blank" rel="noreferrer">
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
      </section>

      {club.events?.length ? (
        <section className="mt-6">
          <h2 className="text-lg font-medium">Upcoming Events</h2>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            {club.events.map((e, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-md border bg-card p-3">
                <span>{e.title}</span>
                <span className="text-xs">
                  {e.date} — {e.location}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {club.images?.length ? (
        <section className="mt-8">
          <h2 className="text-lg font-medium">Gallery</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {club.images.map((src, i) => (
              <img
                key={i}
                src={src || "/placeholder.svg"}
                alt={`Gallery image ${i + 1} for ${club.name}`}
                className="h-24 w-full rounded-md border object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
