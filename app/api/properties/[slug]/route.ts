import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        const property = await prisma.property.findUnique({
            where: { slug },
            include: {
                reviews: {
                    where: { isApproved: true },
                    select: {
                        overallRating: true,
                    },
                },
                _count: {
                    select: {
                        reviews: {
                            where: { isApproved: true },
                        },
                    },
                },
            },
        });

        if (!property) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Property not found",
                },
                { status: 404 }
            );
        }

        // Calculate average rating
        const averageRating =
            property.reviews.length > 0
                ? property.reviews.reduce(
                      (sum, r) => sum + r.overallRating,
                      0
                  ) / property.reviews.length
                : 0;

        // Format the response
        const formattedProperty = {
            id: property.id,
            name: property.name,
            slug: property.slug,
            location: property.location,
            description: property.description || generateDescription(property),
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            maxGuests: property.maxGuests,
            price: `£${Math.floor(property.pricePerNight / 100)}`, // Convert from pence to pounds
            rating: Number(averageRating.toFixed(1)),
            reviewCount: property._count.reviews,
        };

        return NextResponse.json({
            success: true,
            data: formattedProperty,
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

function generateDescription(property: any): string {
    const bedroomText =
        property.bedrooms === 0
            ? "studio"
            : property.bedrooms === 1
            ? "1-bedroom"
            : `${property.bedrooms}-bedroom`;

    const locationName = property.location.split(",")[0]; // Get just the area name

    return `Experience luxury living in ${locationName} with this beautifully designed ${bedroomText} property. Featuring modern amenities, stylish furnishings, and excellent natural light. Perfect for business travelers, couples, ${
        property.maxGuests >= 4 ? "or families" : ""
    } looking for a premium stay in one of London's most desirable neighborhoods.`;
}
