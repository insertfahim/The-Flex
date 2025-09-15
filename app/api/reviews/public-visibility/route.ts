import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { reviewIds, isPubliclyDisplayed } = await request.json();

        if (!reviewIds || !Array.isArray(reviewIds) || reviewIds.length === 0) {
            return NextResponse.json(
                { success: false, error: "Missing or invalid reviewIds array" },
                { status: 400 }
            );
        }

        if (typeof isPubliclyDisplayed !== "boolean") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing or invalid isPubliclyDisplayed boolean",
                },
                { status: 400 }
            );
        }

        // Update multiple reviews at once
        const updatedReviews = await prisma.review.updateMany({
            where: {
                id: {
                    in: reviewIds,
                },
            },
            data: {
                isApproved: isPubliclyDisplayed,
                status: isPubliclyDisplayed ? "PUBLISHED" : "PENDING",
                updatedAt: new Date(),
            },
        });

        console.log(
            `✅ Updated ${updatedReviews.count} reviews - public display: ${isPubliclyDisplayed}`
        );

        const response = NextResponse.json({
            success: true,
            data: {
                updatedCount: updatedReviews.count,
                isPubliclyDisplayed,
            },
            message: `${updatedReviews.count} review(s) ${
                isPubliclyDisplayed ? "made public" : "hidden from public"
            }`,
        });

        // Ensure no caching for real-time updates
        response.headers.set(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        );

        return response;
    } catch (error) {
        console.error("Error updating review public visibility:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update review public visibility",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch reviews with public visibility filter
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const isPubliclyDisplayed = searchParams.get("public");
        const channel = searchParams.get("channel");
        const property = searchParams.get("property");
        const rating = searchParams.get("rating");
        const search = searchParams.get("search");

        // Build where clause
        const where: any = {
            // Only show approved reviews in the public manager
            isApproved: true,
        };

        // Filter by public visibility if specified
        if (isPubliclyDisplayed !== null) {
            where.isApproved = isPubliclyDisplayed === "true";
        }

        if (channel && channel !== "all") {
            where.channel = channel.toUpperCase();
        }

        if (property && property !== "all") {
            where.property = {
                name: {
                    contains: property,
                    mode: "insensitive",
                },
            };
        }

        if (rating && rating !== "all") {
            const minRating = Number.parseFloat(rating);
            where.overallRating = { gte: minRating };
        }

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            where.OR = [
                {
                    review: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    guestName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    property: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ];
        }

        // Fetch reviews from database
        const dbReviews = await prisma.review.findMany({
            where,
            include: {
                property: {
                    select: {
                        name: true,
                        slug: true,
                        location: true,
                    },
                },
            },
            orderBy: [{ overallRating: "desc" }, { submittedAt: "desc" }],
        });

        console.log(`Found ${dbReviews.length} reviews for public manager`);

        // Transform to match the existing NormalizedReview interface
        const reviews = dbReviews.map((review) => ({
            id: review.id,
            type: "guest-to-host" as const,
            status: review.status.toLowerCase() as
                | "published"
                | "pending"
                | "rejected",
            overallRating: review.overallRating,
            review: review.review,
            categories: {
                cleanliness: review.cleanliness,
                communication: review.communication,
                location: review.location,
                checkin: review.checkin,
                accuracy: review.accuracy,
                value: review.value,
            },
            submittedAt: review.submittedAt,
            guestName: review.guestName,
            listingName: review.property.name,
            channel: review.channel.toLowerCase() as
                | "hostaway"
                | "google"
                | "airbnb"
                | "booking"
                | "direct",
            isApproved: review.isApproved,
            managerNotes: review.managerNotes,
        }));

        const response = NextResponse.json({
            success: true,
            data: reviews,
            count: reviews.length,
            filters: {
                public: isPubliclyDisplayed,
                channel,
                property,
                rating,
                search,
            },
        });

        // Add cache control headers for real-time updates
        response.headers.set(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        return response;
    } catch (error) {
        console.error("Error in /api/reviews/public-visibility:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch reviews",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
