import { type NextRequest, NextResponse } from "next/server";
import {
    GoogleReviewsService,
    normalizeGoogleReview,
} from "@/lib/google-reviews";

export async function GET(request: NextRequest) {
    // Check if Google Places API key is configured
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            {
                error: "Google Places API integration temporarily disabled for demo. Please set up GOOGLE_PLACES_API_KEY to enable.",
                status: "disabled",
                documentation: {
                    message: "To enable Google Reviews integration:",
                    steps: [
                        "1. Enable the Places API (New) in Google Cloud Console",
                        "2. Create a service account or API key with Places API permissions",
                        "3. Add GOOGLE_PLACES_API_KEY to your environment variables",
                        "4. Ensure billing is enabled on your Google Cloud project",
                    ],
                    note: "Due to Google Places API pricing ($17 per 1000 requests for reviews), this feature is opt-in only.",
                },
            },
            { status: 503 }
        );
    }

    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");
    const query = searchParams.get("query");

    const googleService = new GoogleReviewsService(apiKey);

    try {
        let targetPlaceId = placeId;

        // If no placeId provided, search for it using query
        if (!targetPlaceId && query) {
            targetPlaceId = await googleService.searchPlace(query);
            if (!targetPlaceId) {
                return NextResponse.json(
                    { error: "Place not found" },
                    { status: 404 }
                );
            }
        }

        if (!targetPlaceId) {
            return NextResponse.json(
                { error: "Place ID or search query required" },
                { status: 400 }
            );
        }

        const placeDetails = await googleService.getPlaceReviews(targetPlaceId);

        if (!placeDetails) {
            return NextResponse.json(
                { error: "Failed to fetch Google reviews" },
                { status: 500 }
            );
        }

        // Normalize reviews to match our internal format
        const normalizedReviews = placeDetails.reviews.map((review) =>
            normalizeGoogleReview(review, placeDetails.name)
        );

        return NextResponse.json({
            success: true,
            data: normalizedReviews,
            count: normalizedReviews.length,
            placeInfo: {
                name: placeDetails.name,
                rating: placeDetails.rating,
                totalReviews: placeDetails.user_ratings_total,
                placeId: placeDetails.place_id,
            },
        });
    } catch (error) {
        console.error("Error in /api/reviews/google:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch Google reviews",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
