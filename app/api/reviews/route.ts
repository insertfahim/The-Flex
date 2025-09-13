import { NextResponse } from "next/server";
import { getNormalizedReviews } from "@/lib/hostaway-api";
import { applyApprovalsToReviews } from "@/lib/review-storage";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rating = searchParams.get("rating");
        const category = searchParams.get("category");
        const channel = searchParams.get("channel");
        const status = searchParams.get("status");
        const listing = searchParams.get("listing");

        let reviews = await getNormalizedReviews();

        // Apply stored approval statuses
        reviews = await applyApprovalsToReviews(reviews);

        // Apply filters
        if (rating) {
            const minRating = Number.parseInt(rating);
            reviews = reviews.filter(
                (review) => review.overallRating >= minRating
            );
        }

        if (category) {
            reviews = reviews.filter(
                (review) =>
                    review.categories[
                        category as keyof typeof review.categories
                    ] !== undefined
            );
        }

        if (channel) {
            reviews = reviews.filter((review) => review.channel === channel);
        }

        if (status) {
            if (status === "approved") {
                reviews = reviews.filter((review) => review.isApproved);
            } else if (status === "pending") {
                reviews = reviews.filter(
                    (review) =>
                        !review.isApproved && review.status === "published"
                );
            } else {
                reviews = reviews.filter((review) => review.status === status);
            }
        }

        if (listing) {
            reviews = reviews.filter((review) =>
                review.listingName.toLowerCase().includes(listing.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            data: reviews,
            count: reviews.length,
            filters: {
                rating,
                category,
                channel,
                status,
                listing,
            },
        });
    } catch (error) {
        console.error("Error in /api/reviews:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch reviews",
            },
            { status: 500 }
        );
    }
}
