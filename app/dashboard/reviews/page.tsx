"use client";

import { useState, useEffect } from "react";
import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReviewCard } from "@/components/review-card";
import { ReviewFilters } from "@/components/review-filters";
import {
    Loader2,
    ArrowLeft,
    Download,
    RefreshCw,
    BarChart3,
    Eye,
    MessageSquare,
    Check,
    Clock,
    X,
    Star,
} from "lucide-react";
import Link from "next/link";
import type {
    NormalizedReview,
    ReviewFilters as ReviewFiltersType,
} from "@/types/review";

export default function ReviewsManagementPage() {
    const [reviews, setReviews] = useState<NormalizedReview[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ReviewFiltersType>({});
    const [refreshing, setRefreshing] = useState(false);

    // Fetch reviews
    const fetchReviews = async () => {
        try {
            setRefreshing(true);
            const queryParams = new URLSearchParams();

            if (filters.rating)
                queryParams.set("rating", filters.rating.toString());
            if (filters.category) queryParams.set("category", filters.category);
            if (filters.channel) queryParams.set("channel", filters.channel);
            if (filters.status) queryParams.set("status", filters.status);
            if (filters.listing) queryParams.set("listing", filters.listing);

            const response = await fetch(
                `/api/reviews?${queryParams.toString()}`
            );
            const data = await response.json();

            if (data.success) {
                setReviews(data.data);
                setFilteredReviews(data.data);
                setError(null);
            } else {
                setError(data.error || "Failed to fetch reviews");
            }
        } catch (err) {
            setError("Network error occurred");
            console.error("Error fetching reviews:", err);
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
                // Update the review in the local state
                setReviews((prev) =>
                    prev.map((review) =>
                        review.id === reviewId
                            ? {
                                  ...review,
                                  isApproved: approved,
                                  managerNotes,
                                  status: approved ? "published" : "rejected",
                              }
                            : review
                    )
                );
                setFilteredReviews((prev) =>
                    prev.map((review) =>
                        review.id === reviewId
                            ? {
                                  ...review,
                                  isApproved: approved,
                                  managerNotes,
                                  status: approved ? "published" : "rejected",
                              }
                            : review
                    )
                );
                return true;
            } else {
                console.error("Failed to update review approval:", data.error);
                return false;
            }
        } catch (error) {
            console.error("Error updating review approval:", error);
            return false;
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = reviews;

        if (filters.rating) {
            filtered = filtered.filter(
                (review) => review.overallRating >= filters.rating!
            );
        }

        if (filters.status) {
            if (filters.status === "approved") {
                filtered = filtered.filter((review) => review.isApproved);
            } else if (filters.status === "pending") {
                filtered = filtered.filter(
                    (review) =>
                        !review.isApproved && review.status === "pending"
                );
            } else {
                filtered = filtered.filter(
                    (review) => review.status === filters.status
                );
            }
        }

        if (filters.channel) {
            filtered = filtered.filter(
                (review) => review.channel === filters.channel
            );
        }

        if (filters.listing) {
            filtered = filtered.filter((review) =>
                review.listingName
                    .toLowerCase()
                    .includes(filters.listing!.toLowerCase())
            );
        }

        setFilteredReviews(filtered);
    }, [reviews, filters]);

    // Load reviews on mount
    useEffect(() => {
        fetchReviews();
    }, []);

    // Statistics
    const stats = {
        total: reviews.length,
        approved: reviews.filter((r) => r.isApproved).length,
        pending: reviews.filter((r) => !r.isApproved && r.status === "pending")
            .length,
        rejected: reviews.filter((r) => r.status === "rejected").length,
        averageRating:
            reviews.length > 0
                ? Math.round(
                      (reviews.reduce((sum, r) => sum + r.overallRating, 0) /
                          reviews.length) *
                          10
                  ) / 10
                : 0,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <FlexHeader />
                <div className="flex items-center justify-center min-h-[70vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            Loading Reviews
                        </h3>
                        <p className="text-slate-600">
                            Fetching the latest reviews from all channels...
                        </p>
                    </div>
                </div>
                <FlexFooter />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <FlexHeader />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Card className="text-center py-16 bg-gradient-to-br from-white to-red-50 border-0 shadow-lg max-w-md mx-auto">
                        <CardContent>
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                                <X className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                Unable to Load Reviews
                            </h3>
                            <p className="text-red-600 mb-6">{error}</p>
                            <Button
                                onClick={fetchReviews}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <FlexFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <FlexHeader />

            {/* Hero Section with Gradient Background */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            Reviews Management
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-200 max-w-2xl">
                            Manage guest reviews, approve for public display,
                            and track feedback across all properties with
                            powerful analytics and insights.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                {/* Premium Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-3xl font-bold text-slate-900">
                                        {stats.total}
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Total Reviews
                                </div>
                                <div className="text-xs text-slate-500">
                                    +12% from last month
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-green-50 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-3xl font-bold text-green-700">
                                        {stats.approved}
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Check className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Approved
                                </div>
                                <div className="text-xs text-green-600">
                                    {Math.round(
                                        (stats.approved / stats.total) * 100
                                    )}
                                    % approval rate
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-amber-50 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-3xl font-bold text-amber-700">
                                        {stats.pending}
                                    </div>
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <Clock className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Pending
                                </div>
                                <div className="text-xs text-amber-600">
                                    Awaiting approval
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-red-50 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-3xl font-bold text-red-700">
                                        {stats.rejected}
                                    </div>
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <X className="h-5 w-5 text-red-600" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Rejected
                                </div>
                                <div className="text-xs text-red-600">
                                    Quality filtered
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                        <CardContent className="p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-3xl font-bold text-indigo-700">
                                        {stats.averageRating}
                                    </div>
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Star className="h-5 w-5 text-indigo-600 fill-current" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Avg Rating
                                </div>
                                <div className="text-xs text-indigo-600">
                                    Out of 10 stars
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Actions Bar */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:p-6 mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                onClick={fetchReviews}
                                variant="outline"
                                size="sm"
                                disabled={refreshing}
                                className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-all duration-200"
                            >
                                <RefreshCw
                                    className={`h-4 w-4 mr-2 ${
                                        refreshing ? "animate-spin" : ""
                                    }`}
                                />
                                {refreshing ? "Refreshing..." : "Refresh"}
                            </Button>
                            <Link href="/dashboard/analytics">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-indigo-200 shadow-sm"
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Analytics
                                </Button>
                            </Link>
                            <div className="hidden lg:block w-px h-6 bg-slate-300"></div>
                            <div className="text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                                {filteredReviews.length} of {reviews.length}{" "}
                                reviews shown
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/property/shoreditch-heights">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview Public Page
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 hover:from-green-100 hover:to-green-200 shadow-sm"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export Reviews
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <ReviewFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    totalReviews={reviews.length}
                    filteredReviews={filteredReviews.length}
                />

                {/* Enhanced Reviews Grid */}
                {filteredReviews.length > 0 ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Reviews ({filteredReviews.length})
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Live</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {filteredReviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onApprove={handleReviewApproval}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Card className="text-center py-16 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                        <CardContent>
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                                    <MessageSquare className="h-10 w-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {reviews.length === 0
                                        ? "No reviews yet"
                                        : "No matching reviews"}
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    {reviews.length === 0
                                        ? "Reviews will appear here once guests start submitting feedback."
                                        : "Try adjusting your filters to see more reviews."}
                                </p>
                                {Object.keys(filters).length > 0 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setFilters({})}
                                        className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear All Filters
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            <FlexFooter />
        </div>
    );
}
