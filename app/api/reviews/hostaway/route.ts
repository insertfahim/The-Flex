import { NextResponse } from "next/server"
import { getNormalizedReviews } from "@/lib/hostaway-api"

export async function GET() {
  try {
    const reviews = await getNormalizedReviews()

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in /api/reviews/hostaway:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
