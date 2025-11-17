// Types for the Club Directory

export type Club = {
  id: string
  slug: string
  name: string
  logoUrl: string
  shortDescription: string
  fullDescription: string
  category: "Sports" | "Tech" | "Arts" | "Community" | "Academic"
  membershipType: "Open" | "Closed"
  email: string
  social?: {
    website?: string
    twitter?: string
    instagram?: string
  }
  meetingTimes: string
  events: Array<{
    title: string
    date: string
    location: string
  }>
  images?: string[]
}
