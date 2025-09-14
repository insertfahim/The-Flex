import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        // Get properties with their reviews and stats
        const properties = await prisma.property.findMany({
            include: {
                reviews: {
                    orderBy: {
                        submittedAt: "desc",
                    },
                },
                stats: {
                    orderBy: {
                        month: "desc",
                    },
                    take: 6, // Last 6 months
                },
            },
        });

        const propertyPerformance = properties.map((property) => {
            const reviews = property.reviews;
            const stats = property.stats;

            // Calculate review metrics
            const totalReviews = reviews.length;
            const approvedReviews = reviews.filter((r) => r.isApproved).length;
            const pendingReviews = reviews.filter(
                (r) => !r.isApproved && r.status !== "REJECTED"
            ).length;
            const rejectedReviews = reviews.filter(
                (r) => r.status === "REJECTED"
            ).length;

            // Calculate average rating based on approved reviews only
            const approvedReviewsList = reviews.filter((r) => r.isApproved);
            const averageRating =
                approvedReviewsList.length > 0
                    ? approvedReviewsList.reduce(
                          (sum, r) => sum + r.overallRating,
                          0
                      ) / approvedReviewsList.length
                    : 0;

            // Calculate category scores
            const categoryScores = {
                cleanliness: 0,
                communication: 0,
                location: 0,
                checkin: 0,
                accuracy: 0,
                value: 0,
            };

            if (approvedReviewsList.length > 0) {
                const validReviews = approvedReviewsList.filter(
                    (r) => r.cleanliness !== null
                );
                if (validReviews.length > 0) {
                    categoryScores.cleanliness =
                        validReviews.reduce(
                            (sum, r) => sum + (r.cleanliness || 0),
                            0
                        ) / validReviews.length;
                    categoryScores.communication =
                        validReviews.reduce(
                            (sum, r) => sum + (r.communication || 0),
                            0
                        ) / validReviews.length;
                    categoryScores.location =
                        validReviews.reduce(
                            (sum, r) => sum + (r.location || 0),
                            0
                        ) / validReviews.length;
                    categoryScores.checkin =
                        validReviews.reduce(
                            (sum, r) => sum + (r.checkin || 0),
                            0
                        ) / validReviews.length;
                    categoryScores.accuracy =
                        validReviews.reduce(
                            (sum, r) => sum + (r.accuracy || 0),
                            0
                        ) / validReviews.length;
                    categoryScores.value =
                        validReviews.reduce(
                            (sum, r) => sum + (r.value || 0),
                            0
                        ) / validReviews.length;
                }
            }

            // Generate monthly trend from stats
            const monthlyTrend = stats.map((stat) => ({
                month: stat.month,
                rating: stat.avgRating,
                count: stat.totalReviews,
            }));

            // Calculate revenue and occupancy
            const latestStats = stats[0];
            const revenue = latestStats
                ? `£${Math.floor(latestStats.revenue / 100)}`
                : "£0";
            const occupancy = latestStats ? latestStats.occupancy : 0;

            // Identify top issues (mock - would analyze review text in real implementation)
            const topIssues = [];
            if (averageRating < 4.5) {
                if (categoryScores.cleanliness < 4.0)
                    topIssues.push("Cleanliness concerns");
                if (categoryScores.communication < 4.0)
                    topIssues.push("Communication issues");
                if (categoryScores.checkin < 4.0)
                    topIssues.push("Check-in difficulties");
            }

            // Channel breakdown - only count approved reviews
            const channelBreakdown: { [key: string]: number } = {};
            approvedReviewsList.forEach((review) => {
                const channel = review.channel.toLowerCase();
                channelBreakdown[channel] =
                    (channelBreakdown[channel] || 0) + 1;
            });

            return {
                id: property.id,
                name: property.name,
                location: property.location,
                image: property.images[0] || "/placeholder.jpg",
                totalReviews,
                averageRating: Number(averageRating.toFixed(1)),
                ratingChange: 0.1, // Mock - would calculate from previous period
                approvedReviews,
                pendingReviews,
                rejectedReviews,
                categoryScores: {
                    cleanliness: Number(categoryScores.cleanliness.toFixed(1)),
                    communication: Number(
                        categoryScores.communication.toFixed(1)
                    ),
                    location: Number(categoryScores.location.toFixed(1)),
                    checkin: Number(categoryScores.checkin.toFixed(1)),
                    accuracy: Number(categoryScores.accuracy.toFixed(1)),
                    value: Number(categoryScores.value.toFixed(1)),
                },
                monthlyTrend,
                topIssues,
                revenue,
                occupancy: Number(occupancy.toFixed(1)),
                status:
                    property.status === "ACTIVE"
                        ? "Active"
                        : property.status === "MAINTENANCE"
                        ? "Maintenance"
                        : "Inactive",
                lastReviewDate:
                    approvedReviewsList.length > 0
                        ? approvedReviewsList[0].submittedAt
                        : new Date(),
                channelBreakdown,
            };
        });

        return NextResponse.json({
            success: true,
            data: propertyPerformance,
            count: propertyPerformance.length,
        });
    } catch (error) {
        console.error("Error fetching property performance:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch property performance data",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
