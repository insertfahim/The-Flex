"use client"

import { useState, useEffect } from "react"
import type { NormalizedReview, ReviewFilters } from "@/types/review"

export function useReviews(filters?: ReviewFilters) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        const params = new URLSearchParams()

        if (filters?.rating) params.append("rating", filters.rating.toString())
        if (filters?.category) params.append("category", filters.category)
        if (filters?.channel) params.append("channel", filters.channel)
        if (filters?.status) params.append("status", filters.status)
        if (filters?.listing) params.append("listing", filters.listing)

        const response = await fetch(`/api/reviews?${params.toString()}`)
        const data = await response.json()

        if (data.success) {
          setReviews(data.data)
          setError(null)
        } else {
          setError(data.error || "Failed to fetch reviews")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [filters])

  const approveReview = async (reviewId: number, approved: boolean, managerNotes?: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved, managerNotes }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setReviews((prev) =>
          prev.map((review) => (review.id === reviewId ? { ...review, isApproved: approved, managerNotes } : review)),
        )
        return true
      } else {
        setError(data.error || "Failed to update review")
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  return {
    reviews,
    loading,
    error,
    approveReview,
  }
}
