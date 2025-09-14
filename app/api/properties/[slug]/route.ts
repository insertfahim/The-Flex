import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Static fallback data when database is not available
const STATIC_PROPERTIES = [
    {
        id: 1,
        name: "2B SW1 - 12 Belgravia Residence",
        slug: "belgravia-residence",
        location: "Belgravia, London",
        description:
            "Luxury 2-bedroom apartment in the heart of prestigious Belgravia. Features elegant Victorian architecture with modern amenities, marble bathrooms, and prime location near Buckingham Palace.",
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        pricePerNight: 18000, // £180 in pence
        rating: 4.9,
        reviewCount: 47,
        latitude: 51.4994,
        longitude: -0.1547,
        address:
            "Belgravia, Westminster, London, Greater London, England, United Kingdom",
    },
    {
        id: 2,
        name: "2B N1 A - 29 Shoreditch Heights",
        slug: "shoreditch-heights",
        location: "Shoreditch, London",
        description:
            "Experience luxury living in the heart of Shoreditch with this beautifully designed 2-bedroom apartment. Featuring modern amenities, stylish furnishings, and floor-to-ceiling windows.",
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        pricePerNight: 12000, // £120 in pence
        rating: 4.7,
        reviewCount: 32,
        latitude: 51.526165,
        longitude: -0.080325,
        address:
            "Shoreditch, Hackney, London, Greater London, England, United Kingdom",
    },
    {
        id: 3,
        name: "1B E1 B - 15 Canary Wharf Tower",
        slug: "canary-wharf-tower",
        location: "Canary Wharf, London",
        description:
            "Modern 1-bedroom apartment in the heart of London's financial district. Perfect for business travelers with stunning city views and premium amenities.",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        pricePerNight: 15000, // £150 in pence
        rating: 4.6,
        reviewCount: 28,
        latitude: 51.5054,
        longitude: -0.0235,
        address:
            "Canary Wharf, Tower Hamlets, London, Greater London, England, United Kingdom",
    },
    {
        id: 4,
        name: "3B W1 C - 8 Fitzrovia Square",
        slug: "fitzrovia-square",
        location: "Fitzrovia, London",
        description:
            "Spacious 3-bedroom apartment in vibrant Fitzrovia. Ideal for families or groups, featuring a fully equipped kitchen, comfortable living areas, and easy access to central London attractions.",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 20000, // £200 in pence
        rating: 4.8,
        reviewCount: 41,
        latitude: 51.52,
        longitude: -0.1357,
        address:
            "Fitzrovia, Camden, London, Greater London, England, United Kingdom",
    },
    {
        id: 5,
        name: "3B SW3 A - 12 Chelsea Garden Mews",
        slug: "chelsea-garden-mews",
        location: "Chelsea, London",
        description:
            "Elegant 3-bedroom mews house in exclusive Chelsea. Private garden, period features, and walking distance to King's Road shopping and fine dining.",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 25000, // £250 in pence
        rating: 4.9,
        reviewCount: 38,
        latitude: 51.4875,
        longitude: -0.1687,
        address:
            "Chelsea, Kensington and Chelsea, London, Greater London, England, United Kingdom",
    },
    {
        id: 6,
        name: "2B W2 D - 5 Paddington Central",
        slug: "paddington-central",
        location: "Paddington, London",
        description:
            "Contemporary 2-bedroom apartment near Paddington Station. Perfect for travelers with easy access to Heathrow Express and central London. Modern furnishings and city views.",
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        pricePerNight: 14000, // £140 in pence
        rating: 4.5,
        reviewCount: 29,
        latitude: 51.5154,
        longitude: -0.1755,
        address:
            "Paddington, Westminster, London, Greater London, England, United Kingdom",
    },
];

// Helper function to extract location-based slug from full property name slugs
// e.g., "3b-sw3-a-12-chelsea-garden-mews" -> "chelsea-garden-mews"
function extractLocationSlug(slug: string): string {
    // Known location patterns that appear at the end of property slugs
    const locationPatterns = [
        "shoreditch-heights",
        "canary-wharf-tower",
        "fitzrovia-square",
        "chelsea-garden-mews",
        "paddington-central",
        "belgravia-residence",
    ];

    for (const pattern of locationPatterns) {
        if (slug.includes(pattern)) {
            return pattern;
        }
    }

    // If no known pattern found, try to extract the last meaningful part
    // Remove property code patterns (like "3b-sw3-a-12-")
    const parts = slug.split("-");
    if (parts.length > 3) {
        // Look for parts that start with numbers (like room codes) and remove everything before location
        let locationStartIndex = -1;
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].match(/^[0-9]+[a-z]*$/i)) {
                locationStartIndex = i;
                break;
            }
        }
        if (locationStartIndex > 0) {
            return parts.slice(locationStartIndex).join("-");
        }
    }

    return slug; // Return original if no pattern found
}

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        // First try exact slug match from static data
        let property = STATIC_PROPERTIES.find((p) => p.slug === slug);

        // If not found, try to extract the location part from longer slugs
        // e.g., "3b-sw3-a-12-chelsea-garden-mews" -> "chelsea-garden-mews"
        if (!property) {
            const extractedSlug = extractLocationSlug(slug);
            if (extractedSlug !== slug) {
                property = STATIC_PROPERTIES.find(
                    (p) => p.slug === extractedSlug
                );
            }
        }

        // If still not found, try database (only if available)
        if (!property) {
            try {
                let dbProperty = await prisma.property.findUnique({
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

                // If not found in DB with exact slug, try extracted slug
                if (!dbProperty) {
                    const extractedSlug = extractLocationSlug(slug);
                    if (extractedSlug !== slug) {
                        dbProperty = await prisma.property.findUnique({
                            where: { slug: extractedSlug },
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
                    }
                }

                if (dbProperty) {
                    // Calculate average rating
                    const averageRating =
                        dbProperty.reviews.length > 0
                            ? dbProperty.reviews.reduce(
                                  (sum, r) => sum + r.overallRating,
                                  0
                              ) / dbProperty.reviews.length
                            : 0;

                    property = {
                        id: dbProperty.id,
                        name: dbProperty.name,
                        slug: dbProperty.slug,
                        location: dbProperty.location,
                        description:
                            dbProperty.description ||
                            generateDescription(dbProperty),
                        bedrooms: dbProperty.bedrooms,
                        bathrooms: dbProperty.bathrooms,
                        maxGuests: dbProperty.maxGuests,
                        pricePerNight: dbProperty.pricePerNight,
                        rating: Number(averageRating.toFixed(1)),
                        reviewCount: dbProperty._count.reviews,
                        latitude: (dbProperty as any).latitude || null,
                        longitude: (dbProperty as any).longitude || null,
                        address:
                            (dbProperty as any).address || dbProperty.location,
                    };
                }
            } catch (dbError) {
                console.warn(
                    "Database not available, using static data only:",
                    dbError
                );
                // Continue with static data fallback
            }
        }

        if (!property) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Property not found",
                },
                { status: 404 }
            );
        }

        // Format the response (convert pricePerNight to display format)
        const formattedProperty = {
            ...property,
            price: `£${Math.floor(property.pricePerNight / 100)}`, // Convert from pence to pounds
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
