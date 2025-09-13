"use client";

import { useState, useEffect } from "react";
import { useReviews } from "@/hooks/use-reviews";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { generateReviewAnalytics } from "@/lib/review-analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReviewAnalytics } from "@/types/review";

export default function AnalyticsPage() {
    const { reviews, loading, error } = useReviews();
    const [analytics, setAnalytics] = useState<ReviewAnalytics | null>(null);

    useEffect(() => {
        if (reviews.length > 0) {
            const analyticsData = generateReviewAnalytics(reviews);
            setAnalytics(analyticsData);
        }
    }, [reviews]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading analytics...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="text-red-600">
                                Error loading analytics
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {error}
                            </p>
                            <Button onClick={() => window.location.reload()}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Analytics
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Insights and trends from your guest reviews
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {analytics ? (
                    <AnalyticsDashboard analytics={analytics} />
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">
                                    No review data available for analytics.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
