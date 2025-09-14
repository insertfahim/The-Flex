import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rating = searchParams.get("rating");
        const category = searchParams.get("category");
        const channel = searchParams.get("channel");
        const status = searchParams.get("status");
        const listing = searchParams.get("listing");

        // Build where clause
        const where: any = {};

        if (rating) {
            const minRating = Number.parseFloat(rating);
            where.overallRating = { gte: minRating };
        }

        if (channel) {
            where.channel = channel.toUpperCase();
        }

        if (status) {
            if (status === "approved") {
                where.isApproved = true;
            } else if (status === "pending") {
                where.isApproved = false;
                where.status = "PENDING";
            } else {
                where.status = status.toUpperCase();
            }
        }

        if (listing) {
            where.property = {
                name: {
                    contains: listing,
                    mode: "insensitive",
                },
            };
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
            orderBy: {
                submittedAt: "desc",
            },
        });

        console.log(`Found ${dbReviews.length} reviews in database`);

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
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
