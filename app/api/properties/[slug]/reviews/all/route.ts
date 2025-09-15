import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const propertySlug = params.slug;

        if (!propertySlug) {
            return NextResponse.json(
                { success: false, message: "Property slug is required" },
                { status: 400 }
            );
        }

        // First, find the property by slug
        const property = await prisma.property.findFirst({
            where: {
                slug: propertySlug,
            },
        });

        if (!property) {
            return NextResponse.json(
                { success: false, message: "Property not found" },
                { status: 404 }
            );
        }

        // Fetch ALL reviews for this property (approved, pending, and rejected)
        const reviews = await prisma.review.findMany({
            where: {
                propertyId: property.id,
            },
            orderBy: {
                submittedAt: "desc",
            },
        });

        // Normalize review data
        const normalizedReviews = reviews.map((review) => ({
            id: review.id,
            guestName: review.guestName,
            overallRating: review.overallRating,
            review: review.review,
            submittedAt: review.submittedAt,
            channel: review.channel || "hostaway",
            isApproved: review.isApproved,
            status: review.status,
            propertyId: review.propertyId,
            propertyName: property.name,
        }));

        return NextResponse.json({
            success: true,
            data: normalizedReviews,
            total: normalizedReviews.length,
            property: {
                id: property.id,
                name: property.name,
                slug: property.slug,
            },
        });
    } catch (error) {
        console.error("Error fetching all property reviews:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch reviews",
                error:
                    process.env.NODE_ENV === "development" ? error : undefined,
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
