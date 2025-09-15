// Script to populate sample reviews for demo purposes
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function populateReviews() {
    try {
        console.log("Starting to populate reviews...");

        // Get all properties
        const properties = await prisma.property.findMany();

        if (properties.length === 0) {
            console.log(
                "No properties found. Please run populate-property-stats.js first."
            );
            return;
        }

        const sampleReviews = [
            {
                guestName: "Sarah Johnson",
                guestEmail: "sarah.johnson@email.com",
                overallRating: 9.2,
                review: "Absolutely fantastic stay! The apartment was immaculate and the location was perfect for exploring London. The host was very responsive and helpful throughout our stay.",
                channel: "AIRBNB",
                isApproved: true,
                cleanliness: 9.5,
                communication: 9.0,
                location: 9.8,
                checkin: 8.9,
                accuracy: 9.1,
                value: 8.8,
            },
            {
                guestName: "Michael Chen",
                guestEmail: "m.chen@email.com",
                overallRating: 8.7,
                review: "Great apartment in an excellent location. Very clean and well-maintained. Would definitely stay again!",
                channel: "BOOKING",
                isApproved: true,
                cleanliness: 9.0,
                communication: 8.5,
                location: 9.2,
                checkin: 8.8,
                accuracy: 8.7,
                value: 8.3,
            },
            {
                guestName: "Emma Williams",
                guestEmail: "emma.w@email.com",
                overallRating: 9.5,
                review: "Perfect for our London business trip. Modern amenities, great transport links, and spotlessly clean. Highly recommended!",
                channel: "HOSTAWAY",
                isApproved: true,
                cleanliness: 9.8,
                communication: 9.3,
                location: 9.7,
                checkin: 9.4,
                accuracy: 9.5,
                value: 9.2,
            },
            {
                guestName: "David Thompson",
                guestEmail: "d.thompson@email.com",
                overallRating: 8.3,
                review: "Nice apartment, good value for money. The check-in process was smooth and the apartment had everything we needed.",
                channel: "AIRBNB",
                isApproved: true,
                cleanliness: 8.5,
                communication: 8.8,
                location: 8.2,
                checkin: 8.9,
                accuracy: 8.3,
                value: 8.7,
            },
            {
                guestName: "Lisa Parker",
                guestEmail: "lisa.parker@email.com",
                overallRating: 9.1,
                review: "Wonderful stay in London! The apartment exceeded our expectations. Great location, beautiful interior, and excellent host communication.",
                channel: "GOOGLE",
                isApproved: true,
                cleanliness: 9.3,
                communication: 9.5,
                location: 9.0,
                checkin: 8.8,
                accuracy: 9.2,
                value: 8.9,
            },
            {
                guestName: "James Rodriguez",
                guestEmail: "j.rodriguez@email.com",
                overallRating: 8.9,
                review: "Excellent apartment with all modern conveniences. Perfect for our family vacation. The kids loved the space and we appreciated the thoughtful touches.",
                channel: "BOOKING",
                isApproved: true,
                cleanliness: 9.1,
                communication: 8.7,
                location: 9.2,
                checkin: 8.8,
                accuracy: 9.0,
                value: 8.6,
            },
            {
                guestName: "Sophie Martin",
                guestEmail: "sophie.martin@email.com",
                overallRating: 7.8,
                review: "Good location and clean apartment. Check-in was a bit delayed but overall a pleasant stay.",
                channel: "AIRBNB",
                status: "PENDING",
                isApproved: false,
                cleanliness: 8.2,
                communication: 7.5,
                location: 8.8,
                checkin: 7.0,
                accuracy: 7.9,
                value: 7.8,
            },
            {
                guestName: "Robert Wilson",
                guestEmail: "r.wilson@email.com",
                overallRating: 9.4,
                review: "Outstanding property! Every detail was perfect. The apartment is beautifully furnished and the location couldn't be better for business meetings in the city.",
                channel: "HOSTAWAY",
                isApproved: true,
                cleanliness: 9.6,
                communication: 9.2,
                location: 9.8,
                checkin: 9.3,
                accuracy: 9.4,
                value: 9.1,
            },
        ];

        // Get current date for recent reviews
        const now = new Date();
        let reviewCount = 0;

        for (const property of properties) {
            // Create 2-4 reviews per property
            const numReviews = Math.floor(Math.random() * 3) + 2;

            for (
                let i = 0;
                i < numReviews && reviewCount < sampleReviews.length;
                i++
            ) {
                const reviewData = sampleReviews[reviewCount];

                // Random date within last 60 days
                const daysAgo = Math.floor(Math.random() * 60);
                const submittedAt = new Date(
                    now.getTime() - daysAgo * 24 * 60 * 60 * 1000
                );

                // Check if a review already exists for this property with the same guest
                const existingReview = await prisma.review.findFirst({
                    where: {
                        propertyId: property.id,
                        guestName: reviewData.guestName,
                    },
                });

                if (!existingReview) {
                    await prisma.review.create({
                        data: {
                            ...reviewData,
                            propertyId: property.id,
                            submittedAt: submittedAt,
                        },
                    });

                    console.log(
                        `Created review for ${property.name} by ${reviewData.guestName} - ${reviewData.overallRating}/10`
                    );
                    reviewCount++;
                } else {
                    console.log(
                        `Review already exists for ${property.name} by ${reviewData.guestName}`
                    );
                }
            }
        }

        console.log("Reviews population completed successfully!");

        // Show summary
        const totalReviews = await prisma.review.count();
        const approvedReviews = await prisma.review.count({
            where: { isApproved: true },
        });
        const pendingReviews = await prisma.review.count({
            where: { isApproved: false, status: "PENDING" },
        });
        const avgRating = await prisma.review.aggregate({
            _avg: {
                overallRating: true,
            },
            where: {
                isApproved: true,
            },
        });

        console.log(`\nSummary:`);
        console.log(`Total reviews: ${totalReviews}`);
        console.log(`Approved reviews: ${approvedReviews}`);
        console.log(`Pending reviews: ${pendingReviews}`);
        console.log(
            `Average rating: ${(avgRating._avg.overallRating || 0).toFixed(
                1
            )}/10`
        );
    } catch (error) {
        console.error("Error populating reviews:", error);
    } finally {
        await prisma.$disconnect();
    }
}

populateReviews();
