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
                        !review.isApproved && review.status === "published"
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
        pending: reviews.filter(
            (r) => !r.isApproved && r.status === "published"
        ).length,
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
            <div className="min-h-screen bg-gray-50">
                <FlexHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-[#284E4C]" />
                        <span className="text-gray-600">
                            Loading reviews...
                        </span>
                    </div>
                </div>
                <FlexFooter />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <FlexHeader />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-red-600 mb-4">Error: {error}</p>
                            <Button
                                onClick={fetchReviews}
                                className="bg-[#284E4C] hover:bg-[#1e3a38]"
                            >
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
        <div className="min-h-screen bg-gray-50">
            <FlexHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Reviews Management
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Manage guest reviews, approve for public display, and
                        track feedback across all properties.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <Card className="bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-gray-900">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Reviews
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-green-600">
                                {stats.approved}
                            </div>
                            <div className="text-sm text-gray-600">
                                Approved
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.pending}
                            </div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-red-600">
                                {stats.rejected}
                            </div>
                            <div className="text-sm text-gray-600">
                                Rejected
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-[#284E4C]">
                                {stats.averageRating}
                            </div>
                            <div className="text-sm text-gray-600">
                                Avg Rating
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={fetchReviews}
                            variant="outline"
                            size="sm"
                            disabled={refreshing}
                            className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white"
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-2 ${
                                    refreshing ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>
                        <Link href="/dashboard/analytics">
                            <Button variant="outline" size="sm">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Analytics
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/property/shoreditch-heights">
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Public Page
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <ReviewFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    totalReviews={reviews.length}
                    filteredReviews={filteredReviews.length}
                />

                {/* Reviews Grid */}
                {filteredReviews.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onApprove={handleReviewApproval}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-gray-500 mb-4">
                                {reviews.length === 0
                                    ? "No reviews found."
                                    : "No reviews match your current filters."}
                            </p>
                            {Object.keys(filters).length > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={() => setFilters({})}
                                    className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </main>

            <FlexFooter />
        </div>
    );
}
