"use client";

import { useState, useEffect } from "react";
import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { PublicReviewManager } from "@/components/public-review-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowLeft,
    Globe,
    Eye,
    CheckCircle,
    AlertCircle,
    RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { NormalizedReview } from "@/types/review";

export default function PublicReviewsPage() {
    const [reviews, setReviews] = useState<NormalizedReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const searchParams = useSearchParams();
    const propertyFilter = searchParams.get("property");

    // Fetch reviews data
    const fetchReviews = async () => {
        setRefreshing(true);
        try {
            const response = await fetch("/api/reviews");
            const data = await response.json();
            if (data.success) {
                const processedReviews = data.data.map((review: any) => ({
                    ...review,
                    submittedAt: new Date(review.submittedAt),
                }));
                setReviews(processedReviews);
            } else {
                // Fallback to demo data
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
                }
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handle review updates
    const handleUpdateReview = async (
        reviewId: number,
        updates: Partial<NormalizedReview>
    ) => {
        try {
            // In a real app, this would make an API call
            // For now, just update local state
            setReviews((prev) =>
                prev.map((review) =>
                    review.id === reviewId ? { ...review, ...updates } : review
                )
            );
            return true;
        } catch (error) {
            console.error("Error updating review:", error);
            return false;
        }
    };

    // Calculate stats
    const approvedReviews = reviews ? reviews.filter((r) => r.isApproved) : [];
    const publicDisplayedReviews = approvedReviews.filter((r) => r.isApproved); // Simplified for demo

    const stats = {
        total: approvedReviews.length,
        displayed: publicDisplayedReviews.length,
        hidden: approvedReviews.length - publicDisplayedReviews.length,
        averageRating:
            approvedReviews.length > 0
                ? approvedReviews.reduce((sum, r) => sum + r.overallRating, 0) /
                  approvedReviews.length
                : 0,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <FlexHeader />
                <div className="flex items-center justify-center py-20">
                    <RefreshCw className="h-8 w-8 animate-spin text-[#284E4C]" />
                    <span className="ml-3 text-lg text-gray-600">
                        Loading review data...
                    </span>
                </div>
                <FlexFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <FlexHeader />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#284E4C] to-[#1a3531] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                Public Review Manager
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl">
                                Control which reviews are displayed on your
                                public property pages. Curate the best reviews
                                to showcase your properties and build trust with
                                potential guests.
                            </p>
                        </div>
                        <div className="flex gap-3">
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
                                Refresh Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        Approved Reviews
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.total}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Globe className="h-8 w-8 text-blue-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        Publicly Displayed
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.displayed}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Eye className="h-8 w-8 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        Hidden
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.hidden}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        Average Rating
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.averageRating.toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Public Review Manager Component */}
                <PublicReviewManager
                    reviews={reviews}
                    propertyFilter={propertyFilter || undefined}
                    onUpdateReview={handleUpdateReview}
                />
            </div>

            <FlexFooter />
        </div>
    );
}
