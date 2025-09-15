// Script to populate PropertyStats for demo purposes
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function populatePropertyStats() {
    try {
        console.log("Starting to populate property stats...");

        // Get all properties
        const properties = await prisma.property.findMany();

        if (properties.length === 0) {
            console.log(
                "No properties found. Creating sample properties first..."
            );

            // Create sample properties
            const sampleProperties = [
                {
                    name: "Luxury Canary Wharf Apartment",
                    slug: "luxury-canary-wharf-apartment",
                    location: "Canary Wharf, London",
                    description:
                        "Modern luxury apartment with stunning city views",
                    images: ["/luxury-canary-wharf-apartment.jpg"],
                    bedrooms: 2,
                    bathrooms: 2,
                    maxGuests: 4,
                    pricePerNight: 25000, // £250 per night in pence
                    latitude: 51.5045,
                    longitude: -0.0196,
                    address: "1 Bank Street, Canary Wharf, London E14 5NY",
                    neighborhood: "Canary Wharf",
                },
                {
                    name: "Modern Furnished Apartment",
                    slug: "modern-furnished-apartment",
                    location: "Central London",
                    description:
                        "Stylish modern apartment in the heart of London",
                    images: ["/modern-furnished-apartment-living-room.jpg"],
                    bedrooms: 1,
                    bathrooms: 1,
                    maxGuests: 2,
                    pricePerNight: 18000, // £180 per night in pence
                    latitude: 51.5074,
                    longitude: -0.1278,
                    address: "Central London",
                    neighborhood: "Central London",
                },
                {
                    name: "Elegant Bathroom Apartment",
                    slug: "elegant-bathroom-apartment",
                    location: "Kensington, London",
                    description:
                        "Beautiful apartment with elegant bathroom facilities",
                    images: ["/elegant-bathroom-with-rainfall-shower.jpg"],
                    bedrooms: 3,
                    bathrooms: 2,
                    maxGuests: 6,
                    pricePerNight: 32000, // £320 per night in pence
                    latitude: 51.4994,
                    longitude: -0.1746,
                    address: "Kensington, London",
                    neighborhood: "Kensington",
                },
            ];

            for (const property of sampleProperties) {
                await prisma.property.create({
                    data: property,
                });
            }

            console.log("Created sample properties");
        }

        // Get properties again (including newly created ones)
        const allProperties = await prisma.property.findMany();
        console.log(`Found ${allProperties.length} properties`);

        // Generate stats for the last 12 months
        const currentDate = new Date();
        const months = [];

        for (let i = 11; i >= 0; i--) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - i,
                1
            );
            months.push(date.toISOString().slice(0, 7)); // YYYY-MM format
        }

        console.log(`Generating stats for months: ${months.join(", ")}`);

        for (const property of allProperties) {
            for (const month of months) {
                // Check if stats already exist for this property and month
                const existingStats = await prisma.propertyStats.findUnique({
                    where: {
                        propertyId_month: {
                            propertyId: property.id,
                            month: month,
                        },
                    },
                });

                if (!existingStats) {
                    // Generate realistic stats
                    const baseRevenue = property.pricePerNight * 30; // Base monthly revenue (assuming 30 nights)
                    const variance = 0.8 + Math.random() * 0.4; // 80-120% variance
                    const monthlyRevenue = Math.round(baseRevenue * variance);

                    const baseOccupancy = 75 + Math.random() * 20; // 75-95% occupancy
                    const occupancyRate = Math.min(
                        Math.round(baseOccupancy * 10) / 10,
                        95
                    );

                    // Generate review stats
                    const totalReviews = Math.floor(Math.random() * 8) + 2; // 2-9 reviews per month
                    const avgRating = 3.5 + Math.random() * 1.5; // 3.5-5.0 rating

                    await prisma.propertyStats.create({
                        data: {
                            propertyId: property.id,
                            month: month,
                            revenue: monthlyRevenue,
                            occupancy: occupancyRate,
                            totalReviews: totalReviews,
                            avgRating: Math.round(avgRating * 10) / 10,
                        },
                    });

                    console.log(
                        `Created stats for ${property.name} - ${month}: £${(
                            monthlyRevenue / 100
                        ).toFixed(2)}, ${occupancyRate}% occupancy`
                    );
                } else {
                    console.log(
                        `Stats already exist for ${property.name} - ${month}`
                    );
                }
            }
        }

        console.log("Property stats population completed successfully!");

        // Show summary
        const totalStats = await prisma.propertyStats.count();
        const currentMonthStats = await prisma.propertyStats.aggregate({
            where: {
                month: currentDate.toISOString().slice(0, 7),
            },
            _sum: {
                revenue: true,
            },
            _avg: {
                occupancy: true,
                avgRating: true,
            },
        });

        console.log(`\nSummary:`);
        console.log(`Total PropertyStats records: ${totalStats}`);
        console.log(
            `Current month total revenue: £${(
                (currentMonthStats._sum.revenue || 0) / 100
            ).toFixed(2)}`
        );
        console.log(
            `Current month avg occupancy: ${(
                currentMonthStats._avg.occupancy || 0
            ).toFixed(1)}%`
        );
        console.log(
            `Current month avg rating: ${(
                currentMonthStats._avg.avgRating || 0
            ).toFixed(1)}`
        );
    } catch (error) {
        console.error("Error populating property stats:", error);
    } finally {
        await prisma.$disconnect();
    }
}

populatePropertyStats();
