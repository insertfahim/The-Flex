import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Demo data for when database is empty
const generateDemoStats = (timeRange: string) => {
    const baseStats = {
        totalRevenue: 20139,
        revenueChange: -9.3,
        totalProperties: 5,
        propertiesChange: 3.2,
        totalReviews: 14,
        reviewsChange: 8.7,
        averageRating: 8.3,
        ratingChange: 0.3,
        occupancyRate: 86.5,
        occupancyChange: -10.8,
        responseRate: 96,
        responseChange: 4.2,
        pendingReviews: 2,
        approvedReviews: 12,
        rejectedReviews: 0,
        totalReviewsAllTime: 14,
    };

    // Adjust based on time range
    switch (timeRange) {
        case "7d":
            return {
                ...baseStats,
                totalReviews: 3,
                reviewsChange: 15.2,
                averageRating: 8.7,
                ratingChange: 0.5,
            };
        case "90d":
            return {
                ...baseStats,
                totalReviews: 28,
                reviewsChange: 12.1,
                averageRating: 8.1,
                ratingChange: -0.2,
            };
        case "1y":
            return {
                ...baseStats,
                totalReviews: 85,
                reviewsChange: 25.4,
                averageRating: 8.2,
                ratingChange: 0.8,
                totalRevenue: 125840,
                revenueChange: 18.7,
            };
        default:
            return baseStats;
    }
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const timeRange = searchParams.get("timeRange") || "30d";

        // Calculate date range
        const now = new Date();
        let startDate = new Date();

        switch (timeRange) {
            case "7d":
                startDate.setDate(now.getDate() - 7);
                break;
            case "30d":
                startDate.setDate(now.getDate() - 30);
                break;
            case "90d":
                startDate.setDate(now.getDate() - 90);
                break;
            case "1y":
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                startDate.setDate(now.getDate() - 30);
        }

        try {
            // Try to get real data from database
            const [
                totalProperties,
                totalReviews,
                approvedReviews,
                pendingReviews,
                rejectedReviews,
                recentReviews,
            ] = await Promise.all([
                prisma.property.count({
                    where: { status: "ACTIVE" },
                }),
                prisma.review.count(),
                prisma.review.count({
                    where: { isApproved: true },
                }),
                prisma.review.count({
                    where: {
                        isApproved: false,
                        status: "PUBLISHED",
                    },
                }),
                prisma.review.count({
                    where: { status: "REJECTED" },
                }),
                prisma.review.count({
                    where: {
                        submittedAt: { gte: startDate },
                    },
                }),
            ]);

            // Calculate average rating
            const avgRatingResult = await prisma.review.aggregate({
                _avg: {
                    overallRating: true,
                },
                where: {
                    isApproved: true,
                    submittedAt: { gte: startDate },
                },
            });

            // Always use real database data when available
            console.log("Database stats:", {
                totalReviews,
                pendingReviews,
                approvedReviews,
                rejectedReviews,
            });

            // Get revenue data from property stats
            const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM format
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                .toISOString()
                .slice(0, 7);

            const [currentMonthStats, lastMonthStats] = await Promise.all([
                prisma.propertyStats.aggregate({
                    _sum: { revenue: true },
                    _avg: { occupancy: true },
                    where: { month: currentMonth },
                }),
                prisma.propertyStats.aggregate({
                    _sum: { revenue: true },
                    _avg: { occupancy: true },
                    where: { month: lastMonth },
                }),
            ]);

            // Calculate changes
            const currentRevenue = currentMonthStats._sum.revenue || 0;
            const lastRevenue = lastMonthStats._sum.revenue || 1;
            const revenueChange =
                ((currentRevenue - lastRevenue) / lastRevenue) * 100;

            const currentOccupancy = currentMonthStats._avg.occupancy || 0;
            const lastOccupancy = lastMonthStats._avg.occupancy || 1;
            const occupancyChange = currentOccupancy - lastOccupancy;

            // Mock some additional stats that would come from other systems
            const responseRate = 96;
            const responseChange = 4.2;

            const stats = {
                totalRevenue: Math.floor(currentRevenue / 100), // Convert from pence to pounds
                revenueChange: Number(revenueChange.toFixed(1)),
                totalProperties,
                propertiesChange: 3.2, // Mock - would calculate from property creation dates
                totalReviews: recentReviews,
                reviewsChange: 8.7, // Mock - would calculate from previous period
                averageRating: Number(
                    (avgRatingResult._avg.overallRating || 0).toFixed(1)
                ),
                ratingChange: 0.3, // Mock - would calculate from previous period
                occupancyRate: Number(currentOccupancy.toFixed(1)),
                occupancyChange: Number(occupancyChange.toFixed(1)),
                responseRate,
                responseChange,
                pendingReviews,
                approvedReviews,
                rejectedReviews,
                totalReviewsAllTime: totalReviews,
            };

            return NextResponse.json({
                success: true,
                data: stats,
                timeRange,
                dataSource: "database",
            });
        } catch (dbError) {
            console.warn("Database query failed, using demo data:", dbError);
        }

        // Fallback to demo data
        console.log("Using demo data for dashboard stats");
        const demoStats = generateDemoStats(timeRange);

        return NextResponse.json({
            success: true,
            data: demoStats,
            timeRange,
            dataSource: "demo",
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);

        // Final fallback to demo data
        const demoStats = generateDemoStats("30d");
        return NextResponse.json({
            success: true,
            data: demoStats,
            timeRange: "30d",
            dataSource: "demo",
            warning: "Using fallback demo data due to error",
        });
    }
}
