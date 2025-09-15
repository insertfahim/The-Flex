import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit");

        // First, find the property by slug
        const property = await prisma.property.findUnique({
            where: { slug },
            select: { id: true, name: true, slug: true },
        });

        if (!property) {
            return NextResponse.json(
                { success: false, error: "Property not found" },
                { status: 404 }
            );
        }

        // Fetch approved reviews for this specific property
        const reviews = await prisma.review.findMany({
            where: {
                propertyId: property.id,
                isApproved: true,
                status: "PUBLISHED",
            },
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
            take: limit ? parseInt(limit) : undefined,
        });

        // Transform to match the NormalizedReview interface
        const normalizedReviews = reviews.map((review) => ({
            id: review.id,
            type: "guest-to-host" as const,
            status: review.status.toLowerCase() as "published",
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
            data: normalizedReviews,
            property: {
                id: property.id,
                name: property.name,
                slug: property.slug,
            },
            count: normalizedReviews.length,
        });
    } catch (error) {
        console.error("Error fetching property reviews:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
