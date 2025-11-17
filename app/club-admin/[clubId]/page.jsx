"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { clubs } from "@/lib/clubs"

export default function ClubAdminPage() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.clubId

  const [currentUser, setCurrentUser] = useState(null)
  const [club, setClub] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    email: "",
    meetingTimes: "",
    membershipType: "",
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")

    if (!user || user.role !== "admin" || user.assignedClubId !== clubId) {
      router.push("/")
      return
    }

    setCurrentUser(user)

    const clubData = clubs.find((c) => c.id === clubId)
    if (!clubData) {
      setError("Club not found")
      setLoading(false)
      return
    }

    setClub(clubData)
    setFormData({
      name: clubData.name,
      shortDescription: clubData.shortDescription,
      fullDescription: clubData.fullDescription,
      email: clubData.email,
      meetingTimes: clubData.meetingTimes,
      membershipType: clubData.membershipType,
    })
    setLoading(false)
  }, [clubId, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const clubsData = JSON.parse(localStorage.getItem("clubsData") || "{}")
      clubsData[clubId] = { ...formData, id: clubId }
      localStorage.setItem("clubsData", JSON.stringify(clubsData))

      setSuccess("Club details updated successfully!")
      setEditMode(false)
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to save club details")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error && !club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{club?.name} - Admin Panel</h1>
            <p className="text-muted-foreground mt-1">Club ID: {clubId}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* User Info */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm">Logged in as</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{currentUser?.name}</p>
            <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
          </CardContent>
        </Card>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-700">{success}</div>
        )}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>}

        {/* Edit Toggle Button */}
        <div className="mb-6 flex gap-2">
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} className="bg-blue-600 hover:bg-blue-700">
              Edit Club Details
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel Editing
            </Button>
          )}
        </div>

        {/* Club Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>
              {editMode ? "Make changes to your club details below" : "View your club information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Club Name</label>
                  <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <label className="text-sm font-medium">Short Description</label>
                  <Input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Brief description for directory listings"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-24"
                    placeholder="Detailed description of your club"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <label className="text-sm font-medium">Meeting Times</label>
                  <Input
                    name="meetingTimes"
                    value={formData.meetingTimes}
                    onChange={handleChange}
                    placeholder="e.g., Mondays and Wednesdays, 6-8 PM"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Membership Type</label>
                  <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    required
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Club Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Short Description</p>
                  <p className="font-medium">{formData.shortDescription}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Full Description</p>
                  <p className="font-medium whitespace-pre-wrap">{formData.fullDescription}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Meeting Times</p>
                  <p className="font-medium">{formData.meetingTimes}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Membership Type</p>
                  <p className="font-medium">{formData.membershipType}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Directory */}
        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">Back to Club Directory</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
