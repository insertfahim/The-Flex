import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mapboxService } from "@/lib/mapbox";

export async function POST(request: NextRequest) {
    try {
        const { propertyId, address } = await request.json();

        if (!propertyId || !address) {
            return NextResponse.json(
                { error: "Property ID and address are required" },
                { status: 400 }
            );
        }

        // Check if property exists
        const property = await prisma.property.findUnique({
            where: { id: parseInt(propertyId) },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        // Geocode the address
        const coordinates = await mapboxService.geocodeAddress(address);

        if (!coordinates) {
            return NextResponse.json(
                { error: "Failed to geocode address" },
                { status: 422 }
            );
        }

        // Update property with coordinates
        const updatedProperty = await prisma.property.update({
            where: { id: parseInt(propertyId) },
            data: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                address: address,
            },
        });

        return NextResponse.json({
            success: true,
            property: updatedProperty,
            coordinates,
        });
    } catch (error) {
        console.error("Geocoding error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get("action");

        if (action === "geocode-all") {
            // Geocode all properties that don't have coordinates
            const properties = await prisma.property.findMany({
                where: {
                    OR: [{ latitude: null }, { longitude: null }],
                },
            });

            const results = [];
            const batchSize = 5; // Process in batches to respect rate limits

            for (let i = 0; i < properties.length; i += batchSize) {
                const batch = properties.slice(i, i + batchSize);

                const batchPromises = batch.map(async (property) => {
                    try {
                        // Use the location field as the address to geocode
                        const coordinates = await mapboxService.geocodeAddress(
                            property.location
                        );

                        if (coordinates) {
                            const updatedProperty =
                                await prisma.property.update({
                                    where: { id: property.id },
                                    data: {
                                        latitude: coordinates.latitude,
                                        longitude: coordinates.longitude,
                                        address: property.location,
                                    },
                                });

                            return {
                                id: property.id,
                                name: property.name,
                                success: true,
                                coordinates,
                                property: updatedProperty,
                            };
                        } else {
                            return {
                                id: property.id,
                                name: property.name,
                                success: false,
                                error: "Failed to geocode",
                            };
                        }
                    } catch (error) {
                        return {
                            id: property.id,
                            name: property.name,
                            success: false,
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Unknown error",
                        };
                    }
                });

                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);

                // Add delay between batches to respect rate limits
                if (i + batchSize < properties.length) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            }

            return NextResponse.json({
                success: true,
                message: `Processed ${properties.length} properties`,
                results,
                summary: {
                    total: properties.length,
                    successful: results.filter((r) => r.success).length,
                    failed: results.filter((r) => !r.success).length,
                },
            });
        }

        if (action === "validate-token") {
            // Validate Mapbox token
            const isValid = await mapboxService.validateToken();
            return NextResponse.json({
                valid: isValid,
                message: isValid ? "Token is valid" : "Token validation failed",
            });
        }

        return NextResponse.json(
            { error: "Invalid action parameter" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Geocoding API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
