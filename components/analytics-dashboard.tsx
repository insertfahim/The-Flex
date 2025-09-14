"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { AlertTriangle, Star, Users, MessageSquare, Info } from "lucide-react";
import type { ReviewAnalytics } from "@/types/review";

interface AnalyticsDashboardProps {
    analytics: ReviewAnalytics;
    isDemoData?: boolean;
    reviews?: any[]; // Add reviews data for additional calculations
}

export function AnalyticsDashboard({
    analytics,
    isDemoData = false,
    reviews = [],
}: AnalyticsDashboardProps) {
    const {
        totalReviews,
        averageRating,
        ratingDistribution,
        categoryAverages,
        channelBreakdown,
        monthlyTrends,
        topProperties,
        commonIssues,
        performanceAlerts,
    } = analytics;

    const ratingChartData = Object.entries(ratingDistribution).map(
        ([rating, count]) => ({
            rating: `${rating}★`,
            count,
        })
    );

    const categoryChartData = Object.entries(categoryAverages).map(
        ([category, average]) => ({
            category: category.replace("_", " "),
            average: Number(average.toFixed(1)),
        })
    );

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="space-y-6">
            {/* Key Insights Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Key Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-900 mb-1">
                                Overall Performance
                            </h4>
                            <p className="text-sm text-green-700">
                                {averageRating >= 8.5
                                    ? "Excellent"
                                    : averageRating >= 7.5
                                    ? "Good"
                                    : averageRating >= 6.5
                                    ? "Fair"
                                    : "Needs Improvement"}
                                ({averageRating.toFixed(1)}/10)
                            </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-1">
                                Most Common Rating
                            </h4>
                            <p className="text-sm text-blue-700">
                                {Object.entries(ratingDistribution).sort(
                                    ([, a], [, b]) => b - a
                                )[0]?.[0] || "N/A"}
                                /10 (
                                {Object.entries(ratingDistribution).sort(
                                    ([, a], [, b]) => b - a
                                )[0]?.[1] || 0}{" "}
                                reviews)
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h4 className="font-medium text-purple-900 mb-1">
                                Top Strength
                            </h4>
                            <p className="text-sm text-purple-700 capitalize">
                                {Object.entries(categoryAverages)
                                    .sort(([, a], [, b]) => b - a)[0]?.[0]
                                    ?.replace("_", " ") || "N/A"}
                                (
                                {Object.entries(categoryAverages)
                                    .sort(([, a], [, b]) => b - a)[0]?.[1]
                                    ?.toFixed(1) || 0}
                                /10)
                            </p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <h4 className="font-medium text-amber-900 mb-1">
                                Primary Channel
                            </h4>
                            <p className="text-sm text-amber-700 capitalize">
                                {Object.entries(channelBreakdown).sort(
                                    ([, a], [, b]) => b - a
                                )[0]?.[0] || "N/A"}
                                (
                                {(
                                    ((Object.entries(channelBreakdown).sort(
                                        ([, a], [, b]) => b - a
                                    )[0]?.[1] || 0) /
                                        totalReviews) *
                                    100
                                ).toFixed(0)}
                                %)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Reviews
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalReviews}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all properties
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Rating
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {averageRating.toFixed(1)}/10
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                        i < Math.floor(averageRating / 2)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Top Channel
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">
                            {Object.entries(channelBreakdown).sort(
                                ([, a], [, b]) => b - a
                            )[0]?.[0] || "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {Object.entries(channelBreakdown).sort(
                                ([, a], [, b]) => b - a
                            )[0]?.[1] || 0}{" "}
                            reviews
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Issues Detected
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {commonIssues.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {
                                commonIssues.filter(
                                    (i) => i.severity === "high"
                                ).length
                            }{" "}
                            high priority
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Alerts */}
            {performanceAlerts && performanceAlerts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Performance Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {performanceAlerts.map((alert, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border-l-4 ${
                                        alert.priority === "high"
                                            ? "border-red-500 bg-red-50"
                                            : alert.priority === "medium"
                                            ? "border-amber-500 bg-amber-50"
                                            : "border-blue-500 bg-blue-50"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-sm">
                                                {alert.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {alert.message}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                alert.priority === "high"
                                                    ? "destructive"
                                                    : "secondary"
                                            }
                                            className="text-xs"
                                        >
                                            {alert.priority}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rating Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rating Distribution</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Distribution of guest ratings across 1-10 scale
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ratingChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rating" />
                                <YAxis
                                    label={{
                                        value: "Number of Reviews",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <Tooltip
                                    formatter={(value, name) => [
                                        value,
                                        "Reviews",
                                    ]}
                                    labelFormatter={(label) =>
                                        `Rating: ${label}`
                                    }
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#374151"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Monthly Trends */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Trends</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Review volume and average ratings over time
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis
                                    yAxisId="left"
                                    label={{
                                        value: "Review Count",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{
                                        value: "Average Rating",
                                        angle: 90,
                                        position: "insideRight",
                                    }}
                                />
                                <Tooltip
                                    formatter={(value, name) => [
                                        name === "count"
                                            ? value
                                            : `${value}/10`,
                                        name === "count"
                                            ? "Reviews"
                                            : "Avg Rating",
                                    ]}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#374151"
                                    strokeWidth={3}
                                    dot={{
                                        fill: "#374151",
                                        strokeWidth: 2,
                                        r: 4,
                                    }}
                                    name="count"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="averageRating"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    dot={{
                                        fill: "#f59e0b",
                                        strokeWidth: 2,
                                        r: 4,
                                    }}
                                    name="averageRating"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {categoryChartData.map((category) => (
                            <div key={category.category} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium capitalize">
                                        {category.category}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {category.average}/10
                                    </span>
                                </div>
                                <Progress
                                    value={(category.average / 10) * 100}
                                    className="h-2"
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Top Properties */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Properties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topProperties.map((property, index) => (
                            <div
                                key={property.name}
                                className="flex items-center justify-between p-3 rounded-lg border"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm truncate max-w-48">
                                            {property.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {property.count} reviews
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold">
                                        {property.averageRating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Common Issues */}
            {commonIssues.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Common Issues Detected
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {commonIssues.map((issue) => (
                                <div
                                    key={issue.issue}
                                    className="p-4 rounded-lg border"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium capitalize">
                                            {issue.issue}
                                        </h4>
                                        <Badge
                                            className={getSeverityColor(
                                                issue.severity
                                            )}
                                        >
                                            {issue.severity}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {issue.count} mentions in low-rated
                                        reviews
                                    </p>
                                    <div className="mt-2">
                                        <Progress
                                            value={
                                                (issue.count / totalReviews) *
                                                100
                                            }
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Channel Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Review Sources & Performance</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Distribution and average ratings by review channel
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(channelBreakdown).map(
                            ([channel, count]) => {
                                // Calculate average rating for this channel
                                const channelReviews = reviews.filter(
                                    (r: any) => r.channel === channel
                                );
                                const avgRating =
                                    channelReviews.length > 0
                                        ? channelReviews.reduce(
                                              (sum: number, r: any) =>
                                                  sum + r.overallRating,
                                              0
                                          ) / channelReviews.length
                                        : 0;
                                const percentage = (count / totalReviews) * 100;

                                return (
                                    <div
                                        key={channel}
                                        className="text-center p-6 rounded-lg border border-gray-200 bg-gray-50"
                                    >
                                        <div className="text-3xl font-bold text-gray-900 mb-1">
                                            {count}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 capitalize mb-2">
                                            {channel}
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">
                                                {avgRating.toFixed(1)}/10
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <Progress
                                                value={percentage}
                                                className="h-2"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {percentage.toFixed(1)}% of
                                                total
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
