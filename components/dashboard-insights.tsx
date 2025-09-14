"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Star,
    MessageSquare,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { NormalizedReview } from "@/types/review";

interface DashboardInsightsProps {
    reviews: NormalizedReview[];
    timeRange: string;
}

interface TrendData {
    period: string;
    averageRating: number;
    totalReviews: number;
    approvalRate: number;
}

interface IssueAlert {
    id: string;
    type: "critical" | "warning" | "info";
    title: string;
    description: string;
    count: number;
    trend: "up" | "down" | "stable";
    actionRequired: boolean;
    relatedProperty?: string;
}

export function DashboardInsights({
    reviews,
    timeRange,
}: DashboardInsightsProps) {
    // Calculate insights data
    const insights = useMemo(() => {
        const now = new Date();
        const timeRangeMs =
            {
                "7d": 7 * 24 * 60 * 60 * 1000,
                "30d": 30 * 24 * 60 * 60 * 1000,
                "90d": 90 * 24 * 60 * 60 * 1000,
                "1y": 365 * 24 * 60 * 60 * 1000,
            }[timeRange] || 30 * 24 * 60 * 60 * 1000;

        const cutoffDate = new Date(now.getTime() - timeRangeMs);
        const filteredReviews = reviews.filter(
            (review) => review.submittedAt >= cutoffDate
        );

        // Generate trend data
        const trendData = generateTrendData(filteredReviews, timeRange);

        // Generate issue alerts
        const issueAlerts = generateIssueAlerts(filteredReviews);

        // Channel performance
        const channelPerformance = generateChannelPerformance(filteredReviews);

        // Category insights
        const categoryInsights = generateCategoryInsights(filteredReviews);

        // Review velocity
        const reviewVelocity = calculateReviewVelocity(
            filteredReviews,
            timeRange
        );

        return {
            trendData,
            issueAlerts,
            channelPerformance,
            categoryInsights,
            reviewVelocity,
            totalReviews: filteredReviews.length,
            averageRating:
                filteredReviews.length > 0
                    ? filteredReviews.reduce(
                          (sum, r) => sum + r.overallRating,
                          0
                      ) / filteredReviews.length
                    : 0,
            approvalRate:
                filteredReviews.length > 0
                    ? (filteredReviews.filter((r) => r.isApproved).length /
                          filteredReviews.length) *
                      100
                    : 0,
            pendingCount: filteredReviews.filter(
                (r) => !r.isApproved && r.status === "pending"
            ).length,
        };
    }, [reviews, timeRange]);

    const getAlertIcon = (type: IssueAlert["type"]) => {
        switch (type) {
            case "critical":
                return <AlertTriangle className="h-4 w-4 text-red-600" />;
            case "warning":
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
            case "info":
                return <CheckCircle className="h-4 w-4 text-blue-600" />;
        }
    };

    const getAlertColor = (type: IssueAlert["type"]) => {
        switch (type) {
            case "critical":
                return "border-red-200 bg-red-50";
            case "warning":
                return "border-yellow-200 bg-yellow-50";
            case "info":
                return "border-blue-200 bg-blue-50";
        }
    };

    const COLORS = ["#284E4C", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

    return (
        <div className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Reviews
                                </p>
                                <p className="text-2xl font-bold">
                                    {insights.totalReviews}
                                </p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-[#284E4C]" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            {timeRange === "7d"
                                ? "This week"
                                : `Last ${timeRange}`}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Average Rating
                                </p>
                                <p className="text-2xl font-bold">
                                    {insights.averageRating.toFixed(1)}
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-green-600">
                                +0.2 vs previous period
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Approval Rate
                                </p>
                                <p className="text-2xl font-bold">
                                    {insights.approvalRate.toFixed(0)}%
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <Progress
                            value={insights.approvalRate}
                            className="mt-2"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Pending Reviews
                                </p>
                                <p className="text-2xl font-bold">
                                    {insights.pendingCount}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div className="mt-2">
                            {insights.pendingCount > 0 ? (
                                <Link href="/dashboard/reviews?status=pending">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Review Now
                                    </Button>
                                </Link>
                            ) : (
                                <span className="text-sm text-green-600">
                                    All caught up!
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Rating Trends</CardTitle>
                        <p className="text-sm text-gray-600">
                            Average rating over time
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={insights.trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="period" />
                                    <YAxis domain={[0, 10]} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="averageRating"
                                        stroke="#284E4C"
                                        strokeWidth={2}
                                        dot={{ fill: "#284E4C" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Channel Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Channel Performance
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                            Reviews by source
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={insights.channelPerformance}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {insights.channelPerformance.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Issue Alerts */}
            {insights.issueAlerts.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">
                                    Alerts & Insights
                                </CardTitle>
                                <p className="text-sm text-gray-600">
                                    Issues requiring attention
                                </p>
                            </div>
                            <Badge variant="outline">
                                {
                                    insights.issueAlerts.filter(
                                        (a) => a.actionRequired
                                    ).length
                                }{" "}
                                action required
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {insights.issueAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`p-4 rounded-lg border ${getAlertColor(
                                        alert.type
                                    )}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {getAlertIcon(alert.type)}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">
                                                        {alert.title}
                                                    </h4>
                                                    {alert.trend === "up" && (
                                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                                    )}
                                                    {alert.trend === "down" && (
                                                        <TrendingDown className="h-3 w-3 text-green-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {alert.description}
                                                </p>
                                                {alert.relatedProperty && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Related to:{" "}
                                                        {alert.relatedProperty}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {alert.count}
                                            </Badge>
                                            {alert.actionRequired && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    View
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Category Performance */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Category Performance
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                        Average scores across review categories
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={insights.categoryInsights}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Bar dataKey="average" fill="#284E4C" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/dashboard/reviews?status=pending">
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                            >
                                <span>
                                    Review Pending ({insights.pendingCount})
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/analytics">
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                            >
                                <span>View Full Analytics</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/reviews?rating=1">
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                            >
                                <span>Low-Rated Reviews</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Helper functions
function generateTrendData(
    reviews: NormalizedReview[],
    timeRange: string
): TrendData[] {
    const periods = timeRange === "7d" ? 7 : timeRange === "30d" ? 6 : 12;
    const periodType =
        timeRange === "7d" ? "day" : timeRange === "30d" ? "week" : "month";

    const trendData: TrendData[] = [];

    for (let i = periods - 1; i >= 0; i--) {
        const now = new Date();
        let periodStart: Date;
        let periodEnd: Date;
        let periodLabel: string;

        if (periodType === "day") {
            periodStart = new Date(
                now.getTime() - (i + 1) * 24 * 60 * 60 * 1000
            );
            periodEnd = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            periodLabel = periodStart.toLocaleDateString("en-US", {
                weekday: "short",
            });
        } else if (periodType === "week") {
            periodStart = new Date(
                now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000
            );
            periodEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
            periodLabel = `Week ${periods - i}`;
        } else {
            periodStart = new Date(
                now.getFullYear(),
                now.getMonth() - (i + 1),
                1
            );
            periodEnd = new Date(now.getFullYear(), now.getMonth() - i, 1);
            periodLabel = periodStart.toLocaleDateString("en-US", {
                month: "short",
            });
        }

        const periodReviews = reviews.filter(
            (r) => r.submittedAt >= periodStart && r.submittedAt < periodEnd
        );

        const averageRating =
            periodReviews.length > 0
                ? periodReviews.reduce((sum, r) => sum + r.overallRating, 0) /
                  periodReviews.length
                : 0;

        const approvalRate =
            periodReviews.length > 0
                ? (periodReviews.filter((r) => r.isApproved).length /
                      periodReviews.length) *
                  100
                : 0;

        trendData.push({
            period: periodLabel,
            averageRating,
            totalReviews: periodReviews.length,
            approvalRate,
        });
    }

    return trendData;
}

function generateIssueAlerts(reviews: NormalizedReview[]): IssueAlert[] {
    const alerts: IssueAlert[] = [];

    // Low rating alert
    const lowRatingReviews = reviews.filter((r) => r.overallRating < 3.5);
    if (lowRatingReviews.length > 0) {
        alerts.push({
            id: "low-ratings",
            type: "warning",
            title: "Low Rating Reviews",
            description: `${lowRatingReviews.length} reviews with ratings below 3.5 stars`,
            count: lowRatingReviews.length,
            trend: "up",
            actionRequired: true,
        });
    }

    // Pending reviews alert
    const pendingReviews = reviews.filter(
        (r) => !r.isApproved && r.status === "pending"
    );
    if (pendingReviews.length > 10) {
        alerts.push({
            id: "pending-reviews",
            type: "warning",
            title: "High Volume of Pending Reviews",
            description: `${pendingReviews.length} reviews are waiting for approval`,
            count: pendingReviews.length,
            trend: "up",
            actionRequired: true,
        });
    }

    // Category performance alert
    const categoryScores = calculateCategoryAverages(reviews);
    const lowPerformingCategories = Object.entries(categoryScores).filter(
        ([_, score]) => score < 3.5
    );

    if (lowPerformingCategories.length > 0) {
        alerts.push({
            id: "category-performance",
            type: "info",
            title: "Category Performance",
            description: `${lowPerformingCategories.length} categories performing below average`,
            count: lowPerformingCategories.length,
            trend: "stable",
            actionRequired: false,
        });
    }

    return alerts;
}

function generateChannelPerformance(reviews: NormalizedReview[]) {
    const channelCounts: { [key: string]: number } = {};

    reviews.forEach((review) => {
        channelCounts[review.channel] =
            (channelCounts[review.channel] || 0) + 1;
    });

    return Object.entries(channelCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));
}

function generateCategoryInsights(reviews: NormalizedReview[]) {
    const categoryAverages = calculateCategoryAverages(reviews);

    return Object.entries(categoryAverages).map(([category, average]) => ({
        category: category
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        average: Number(average.toFixed(1)),
    }));
}

function calculateCategoryAverages(reviews: NormalizedReview[]) {
    const categoryAverages: { [key: string]: number } = {};
    const categoryKeys = [
        "cleanliness",
        "communication",
        "respect_house_rules",
        "location",
        "checkin",
        "accuracy",
        "value",
    ];

    categoryKeys.forEach((category) => {
        const categoryReviews = reviews.filter(
            (r) =>
                r.categories[category as keyof typeof r.categories] !==
                undefined
        );
        if (categoryReviews.length > 0) {
            const sum = categoryReviews.reduce(
                (acc, r) =>
                    acc +
                    (r.categories[category as keyof typeof r.categories] || 0),
                0
            );
            categoryAverages[category] = sum / categoryReviews.length;
        }
    });

    return categoryAverages;
}

function calculateReviewVelocity(
    reviews: NormalizedReview[],
    timeRange: string
): number {
    const now = new Date();
    const timeRangeMs =
        {
            "7d": 7 * 24 * 60 * 60 * 1000,
            "30d": 30 * 24 * 60 * 60 * 1000,
            "90d": 90 * 24 * 60 * 60 * 1000,
            "1y": 365 * 24 * 60 * 60 * 1000,
        }[timeRange] || 30 * 24 * 60 * 60 * 1000;

    const cutoffDate = new Date(now.getTime() - timeRangeMs);
    const recentReviews = reviews.filter((r) => r.submittedAt >= cutoffDate);

    const days = timeRangeMs / (24 * 60 * 60 * 1000);
    return recentReviews.length / days;
}
