"use client";

import { useState } from "react";
import { useReviews } from "@/hooks/use-reviews";
import { DashboardStats } from "@/components/dashboard-stats";
import { ReviewFilters } from "@/components/review-filters";
import { ReviewCard } from "@/components/review-card";
import { FlexHeader } from "@/components/flex-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, RefreshCw, BarChart3, Home } from "lucide-react";
import Link from "next/link";
import type { ReviewFilters as ReviewFiltersType } from "@/types/review";

export default function DashboardPage() {
    const [filters, setFilters] = useState<ReviewFiltersType>({});
    const { reviews, loading, error, approveReview } = useReviews(filters);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <FlexHeader />
                <div className="flex items-center justify-center py-20">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-[#284E4C]" />
                        <span className="text-[#020817]">
                            Loading reviews...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <FlexHeader />
                <div className="flex items-center justify-center py-20">
                    <Card className="max-w-md border-gray-200 shadow-lg">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <div className="text-red-600 font-medium">
                                    Error loading reviews
                                </div>
                                <p className="text-sm text-[#4B5563]">
                                    {error}
                                </p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="bg-[#284E4C] hover:bg-[#1e3a38] text-white"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Retry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <FlexHeader />

            <div className="bg-white text-gray-800 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Reviews Dashboard
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage and approve guest reviews for your
                                properties
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    <Home className="h-4 w-4 mr-2" />
                                    Public Site
                                </Button>
                            </Link>
                            <Link href="/dashboard/analytics">
                                <Button
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Analytics
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <DashboardStats reviews={reviews} />

                <ReviewFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    totalReviews={reviews.length}
                    filteredReviews={reviews.length}
                />

                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <Card className="border-gray-200 shadow-sm bg-white">
                            <CardContent className="pt-6">
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-[#FEF1F7] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BarChart3 className="h-8 w-8 text-[#284E4C]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#020817] mb-2">
                                        No reviews found
                                    </h3>
                                    <p className="text-[#4B5563] text-base mb-6">
                                        No reviews match your current filters.
                                        Try adjusting your search criteria.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white bg-transparent"
                                        onClick={() => setFilters({})}
                                    >
                                        Clear All Filters
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onApprove={approveReview}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
