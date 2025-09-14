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
    Plus,
    Calendar,
    Clock,
} from "lucide-react";
import Link from "next/link";
import type { NormalizedReview } from "@/types/review";

export default function ManagerDashboard() {
    const [timeRange, setTimeRange] = useState("30d");
    const [activeTab, setActiveTab] = useState("overview");
    const [reviews, setReviews] = useState<NormalizedReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch reviews data
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setRefreshing(true);
            const response = await fetch("/api/reviews");
            const data = await response.json();
            if (data.success) {
                setReviews(data.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
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

    // Calculate dashboard stats from reviews
    const dashboardStats = {
        totalRevenue: 245680,
        revenueChange: 12.5,
        totalProperties: 47,
        propertiesChange: 3.2,
        totalReviews: reviews.length,
        reviewsChange: 8.7,
        averageRating:
            reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.overallRating, 0) /
                  reviews.length
                : 0,
        ratingChange: 0.3,
        occupancyRate: 92,
        occupancyChange: -2.1,
        responseRate: 96,
        responseChange: 4.2,
        pendingReviews: reviews.filter(
            (r) => !r.isApproved && r.status === "published"
        ).length,
        approvedReviews: reviews.filter((r) => r.isApproved).length,
    };

    const quickActions = [
        { icon: Plus, label: "Add Property", color: "bg-blue-500", href: "#" },
        {
            icon: MessageSquare,
            label: "Manage Reviews",
            color: "bg-green-500",
            href: "/dashboard/reviews",
        },
        {
            icon: Calendar,
            label: "Schedule Maintenance",
            color: "bg-orange-500",
            href: "#",
        },
        {
            icon: BarChart3,
            label: "View Analytics",
            color: "bg-purple-500",
            href: "/dashboard/analytics",
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
                                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                <Button className="bg-white/10 hover:bg-white/20 border-white/20">
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
                            <TabsTrigger value="insights">Insights</TabsTrigger>
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

                        {/* Insights Tab */}
                        <TabsContent value="insights" className="space-y-6">
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
