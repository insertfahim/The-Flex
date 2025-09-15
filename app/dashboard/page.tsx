"use client";

import { useState, useEffect } from "react";
import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { PropertyPerformance } from "@/components/property-performance";
import { DashboardInsights } from "@/components/dashboard-insights";
import { ReviewManagementWidget } from "@/components/review-management-widget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    TrendingUp,
    TrendingDown,
    Home,
    Users,
    Star,
    DollarSign,
    MessageSquare,
    Bell,
    Download,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    AlertTriangle,
    Clock,
} from "lucide-react";
import Link from "next/link";
import type { NormalizedReview } from "@/types/review";

export default function ManagerDashboard() {
    const [timeRange, setTimeRange] = useState("all");
    const [activeTab, setActiveTab] = useState("overview");
    const [reviews, setReviews] = useState<NormalizedReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch data
    useEffect(() => {
        fetchData();
    }, [timeRange]);

    const fetchData = async () => {
        try {
            setRefreshing(true);

            // Fetch reviews and stats in parallel
            let reviewsResponse = await fetch("/api/reviews");
            let reviewsData = await reviewsResponse.json();
            let usingDemoData = false;

            // Fallback to demo data if no reviews found
            if (!reviewsData.success || reviewsData.data.length === 0) {
                console.log("No real reviews found, using demo data");
                reviewsResponse = await fetch("/api/reviews/demo");
                reviewsData = await reviewsResponse.json();
                usingDemoData = true;
            }

            const statsResponse = await fetch(
                `/api/dashboard/stats?timeRange=${timeRange}`
            );
            const statsData = await statsResponse.json();

            if (reviewsData.success) {
                // Process reviews with proper date parsing
                const processedReviews = reviewsData.data.map(
                    (review: any) => ({
                        ...review,
                        submittedAt: new Date(review.submittedAt),
                    })
                );
                setReviews(processedReviews);

                // If using demo data, recalculate review counts from actual review data
                if (usingDemoData && statsData.success) {
                    const pendingCount = processedReviews.filter(
                        (r: any) => !r.isApproved && r.status === "pending"
                    ).length;
                    const approvedCount = processedReviews.filter(
                        (r: any) => r.isApproved
                    ).length;
                    const rejectedCount = processedReviews.filter(
                        (r: any) => r.status === "rejected"
                    ).length;

                    // Calculate average rating from demo reviews
                    const avgRating =
                        processedReviews.length > 0
                            ? processedReviews.reduce(
                                  (sum: number, r: any) =>
                                      sum + r.overallRating,
                                  0
                              ) / processedReviews.length
                            : 0;

                    // Update stats with real review counts
                    statsData.data.pendingReviews = pendingCount;
                    statsData.data.approvedReviews = approvedCount;
                    statsData.data.rejectedReviews = rejectedCount;
                    statsData.data.totalReviews = processedReviews.length;
                    statsData.data.averageRating = Number(avgRating.toFixed(1));
                }
            }

            if (statsData.success) {
                setDashboardStats(statsData.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Try demo data as final fallback
            try {
                const demoResponse = await fetch("/api/reviews/demo");
                const demoData = await demoResponse.json();
                if (demoData.success) {
                    const processedReviews = demoData.data.map(
                        (review: any) => ({
                            ...review,
                            submittedAt: new Date(review.submittedAt),
                        })
                    );
                    setReviews(processedReviews);

                    // Calculate stats from demo reviews
                    const pendingCount = processedReviews.filter(
                        (r: any) => !r.isApproved && r.status === "pending"
                    ).length;
                    const approvedCount = processedReviews.filter(
                        (r: any) => r.isApproved
                    ).length;
                    const avgRating =
                        processedReviews.length > 0
                            ? processedReviews.reduce(
                                  (sum: number, r: any) =>
                                      sum + r.overallRating,
                                  0
                              ) / processedReviews.length
                            : 0;

                    setDashboardStats((prev) => ({
                        ...prev,
                        pendingReviews: pendingCount,
                        approvedReviews: approvedCount,
                        totalReviews: processedReviews.length,
                        averageRating: Number(avgRating.toFixed(1)),
                    }));
                }
            } catch (demoError) {
                console.error("Failed to fetch demo data:", demoError);
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fetchReviews = fetchData; // Keep for backward compatibility

    // Export dashboard data as CSV
    const exportDashboardData = () => {
        try {
            // Prepare dashboard summary data
            const summaryData = [
                ["Dashboard Summary", ""],
                ["Export Date", new Date().toLocaleString()],
                ["Time Range", timeRange === "all" ? "All Time" : timeRange],
                ["", ""],
                ["Metric", "Value"],
                [
                    "Total Revenue",
                    `£${dashboardStats.totalRevenue.toLocaleString()}`,
                ],
                [
                    "Revenue Change",
                    `${dashboardStats.revenueChange > 0 ? "+" : ""}${
                        dashboardStats.revenueChange
                    }%`,
                ],
                ["Total Properties", dashboardStats.totalProperties.toString()],
                [
                    "Properties Change",
                    `${dashboardStats.propertiesChange > 0 ? "+" : ""}${
                        dashboardStats.propertiesChange
                    }%`,
                ],
                ["Total Reviews", dashboardStats.totalReviews.toString()],
                [
                    "Reviews Change",
                    `${dashboardStats.reviewsChange > 0 ? "+" : ""}${
                        dashboardStats.reviewsChange
                    }%`,
                ],
                [
                    "Average Rating",
                    `${dashboardStats.averageRating.toFixed(1)}/10`,
                ],
                [
                    "Rating Change",
                    `${
                        dashboardStats.ratingChange > 0 ? "+" : ""
                    }${dashboardStats.ratingChange.toFixed(1)}`,
                ],
                ["Occupancy Rate", `${dashboardStats.occupancyRate}%`],
                [
                    "Occupancy Change",
                    `${dashboardStats.occupancyChange > 0 ? "+" : ""}${
                        dashboardStats.occupancyChange
                    }%`,
                ],
                ["Response Rate", `${dashboardStats.responseRate}%`],
                [
                    "Response Change",
                    `${dashboardStats.responseChange > 0 ? "+" : ""}${
                        dashboardStats.responseChange
                    }%`,
                ],
                ["Pending Reviews", dashboardStats.pendingReviews.toString()],
                ["Approved Reviews", dashboardStats.approvedReviews.toString()],
            ];

            // Convert summary to CSV
            let csvContent = summaryData
                .map((row) => row.map((field) => `"${field}"`).join(","))
                .join("\n");

            // Add reviews data if available
            if (reviews.length > 0) {
                csvContent += "\n\n";
                csvContent += "Recent Reviews\n";
                csvContent +=
                    '"Property","Guest Name","Rating","Comment","Date","Status","Channel"\n';

                reviews.slice(0, 100).forEach((review) => {
                    csvContent +=
                        [
                            `"${review.listingName || "N/A"}"`,
                            `"${review.guestName || "Anonymous"}"`,
                            `"${review.overallRating || "N/A"}"`,
                            `"${(review.review || "").replace(/"/g, '""')}"`,
                            `"${
                                review.submittedAt
                                    ? new Date(
                                          review.submittedAt
                                      ).toLocaleDateString()
                                    : "N/A"
                            }"`,
                            `"${review.isApproved ? "Approved" : "Pending"}"`,
                            `"${review.channel || "N/A"}"`,
                        ].join(",") + "\n";
                });
            }

            // Create and download the file
            const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
            });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);

            link.setAttribute("href", url);
            link.setAttribute(
                "download",
                `dashboard-export-${new Date().toISOString().split("T")[0]}.csv`
            );
            link.style.visibility = "hidden";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("Dashboard data exported successfully");
        } catch (error) {
            console.error("Error exporting dashboard data:", error);
            alert("Failed to export dashboard data. Please try again.");
        }
    };

    // Handle review approval
    const handleReviewApproval = async (
        reviewId: number,
        approved: boolean,
        managerNotes?: string
    ) => {
        try {
            const response = await fetch(`/api/reviews/${reviewId}/approve`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ approved, managerNotes }),
            });

            const data = await response.json();
            if (data.success) {
                // Update local state
                setReviews((prev) =>
                    prev.map((review) =>
                        review.id === reviewId
                            ? { ...review, isApproved: approved, managerNotes }
                            : review
                    )
                );
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error approving review:", error);
            return false;
        }
    };

    // Dashboard stats state
    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        revenueChange: 0,
        totalProperties: 0,
        propertiesChange: 0,
        totalReviews: 0,
        reviewsChange: 0,
        averageRating: 0,
        ratingChange: 0,
        occupancyRate: 0,
        occupancyChange: 0,
        responseRate: 0,
        responseChange: 0,
        pendingReviews: 0,
        approvedReviews: 0,
    });

    const quickActions = [
        {
            icon: MessageSquare,
            label: "Manage Reviews",
            color: "bg-green-500",
            href: "/dashboard/reviews",
        },
        {
            icon: BarChart3,
            label: "View Analytics",
            color: "bg-purple-500",
            href: "/dashboard/analytics",
        },
        {
            icon: Home,
            label: "Property Performance",
            color: "bg-blue-500",
            href: "/dashboard/properties",
        },
        {
            icon: Users,
            label: "Public Reviews",
            color: "bg-indigo-500",
            href: "/dashboard/public-reviews",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <FlexHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex items-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin text-[#284E4C]" />
                        <span className="text-gray-600">
                            Loading dashboard...
                        </span>
                    </div>
                </div>
                <FlexFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <FlexHeader />

            <main className="py-8">
                {/* Dashboard Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="bg-gradient-to-br from-[#284E4C] to-[#1e3a38] rounded-3xl p-8 text-white">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">
                                    Manager Dashboard
                                </h1>
                                <p className="text-xl opacity-90">
                                    Welcome back! Here&apos;s what&apos;s
                                    happening with your properties.
                                </p>
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span className="text-sm">
                                            All systems operational
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bell className="h-4 w-4" />
                                        <span className="text-sm">
                                            {dashboardStats.pendingReviews}{" "}
                                            pending reviews
                                        </span>
                                    </div>
                                    {dashboardStats.pendingReviews > 10 && (
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                                            <span className="text-sm text-yellow-200">
                                                High volume
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 lg:mt-0 flex gap-3">
                                <Select
                                    value={timeRange}
                                    onValueChange={setTimeRange}
                                >
                                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white data-[placeholder]:text-white/70 [&_svg]:text-white [&_svg]:opacity-100 gap-1">
                                        <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All time
                                        </SelectItem>
                                        <SelectItem value="7d">
                                            Last 7 days
                                        </SelectItem>
                                        <SelectItem value="30d">
                                            Last 30 days
                                        </SelectItem>
                                        <SelectItem value="90d">
                                            Last 3 months
                                        </SelectItem>
                                        <SelectItem value="1y">
                                            Last year
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    className="bg-white/10 hover:bg-white/20 border-white/20"
                                    onClick={fetchReviews}
                                    disabled={refreshing}
                                >
                                    <RefreshCw
                                        className={`h-4 w-4 mr-2 ${
                                            refreshing ? "animate-spin" : ""
                                        }`}
                                    />
                                    Refresh
                                </Button>
                                <Button
                                    className="bg-white/10 hover:bg-white/20 border-white/20"
                                    onClick={exportDashboardData}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-6"
                    >
                        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="properties">
                                Properties
                            </TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="trends">Trends</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <DollarSign className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.revenueChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.revenueChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.revenueChange
                                                )}
                                                %
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            £
                                            {dashboardStats.totalRevenue.toLocaleString()}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Total Revenue
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Home className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.propertiesChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.propertiesChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.propertiesChange
                                                )}
                                                %
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {dashboardStats.totalProperties}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Active Properties
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-yellow-100 rounded-lg">
                                                <Star className="h-6 w-6 text-yellow-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.ratingChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.ratingChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.ratingChange
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {dashboardStats.averageRating.toFixed(
                                                1
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Average Rating
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <MessageSquare className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.reviewsChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.reviewsChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.reviewsChange
                                                )}
                                                %
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {dashboardStats.totalReviews.toLocaleString()}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Total Reviews
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <Users className="h-6 w-6 text-orange-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.occupancyChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.occupancyChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.occupancyChange
                                                )}
                                                %
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {dashboardStats.occupancyRate}%
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Occupancy Rate
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 bg-teal-100 rounded-lg">
                                                <Clock className="h-6 w-6 text-teal-600" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${
                                                    dashboardStats.responseChange >
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {dashboardStats.responseChange >
                                                0 ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {Math.abs(
                                                    dashboardStats.responseChange
                                                )}
                                                %
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {dashboardStats.responseRate}%
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Response Rate
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action, index) => (
                                    <Link key={index} href={action.href}>
                                        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
                                            <CardContent className="p-6 text-center">
                                                <div
                                                    className={`inline-flex p-3 rounded-full ${action.color} mb-4`}
                                                >
                                                    <action.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {action.label}
                                                </h3>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Review Management Widget */}
                            <ReviewManagementWidget
                                reviews={reviews}
                                onReviewApproval={handleReviewApproval}
                            />
                        </TabsContent>

                        {/* Properties Tab */}
                        <TabsContent value="properties" className="space-y-6">
                            <PropertyPerformance reviews={reviews} />
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent value="reviews" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <ReviewManagementWidget
                                        reviews={reviews}
                                        onReviewApproval={handleReviewApproval}
                                    />
                                </div>
                                <div>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Review Stats</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        Total Reviews
                                                    </span>
                                                    <span className="font-medium">
                                                        {
                                                            dashboardStats.totalReviews
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        Average Rating
                                                    </span>
                                                    <span className="font-medium">
                                                        {dashboardStats.averageRating.toFixed(
                                                            1
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        Approved
                                                    </span>
                                                    <span className="font-medium text-green-600">
                                                        {
                                                            dashboardStats.approvedReviews
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        Pending
                                                    </span>
                                                    <span className="font-medium text-yellow-600">
                                                        {
                                                            dashboardStats.pendingReviews
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Trends Tab */}
                        <TabsContent value="trends" className="space-y-6">
                            <DashboardInsights
                                reviews={reviews}
                                timeRange={timeRange}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <FlexFooter />
        </div>
    );
}
