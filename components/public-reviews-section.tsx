"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Star,
    ChevronLeft,
    ChevronRight,
    User,
    Calendar,
    MapPin,
} from "lucide-react";
import type { NormalizedReview } from "@/types/review";

interface PublicReviewsSectionProps {
    propertyName?: string;
    maxReviews?: number;
}

export function PublicReviewsSection({
    propertyName,
    maxReviews = 6,
}: PublicReviewsSectionProps) {
    const [reviews, setReviews] = useState<NormalizedReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        async function fetchApprovedReviews() {
            try {
                const params = new URLSearchParams({
                    status: "approved", // Use the new approval filter
                });

                if (propertyName) {
                    params.append("listing", propertyName);
                }

                const response = await fetch(
                    `/api/reviews?${params.toString()}`
                );
                const data = await response.json();

                if (data.success) {
                    // Reviews are already filtered to approved ones by the API
                    setReviews(data.data.slice(0, maxReviews));
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchApprovedReviews();
    }, [propertyName, maxReviews]);

    const renderStars = (rating: number) => {
        const stars = Math.round(rating / 2); // Convert 10-point to 5-point scale
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                    i < stars
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                }`}
            />
        ));
    };

    const reviewsPerPage = 6;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const currentReviews = reviews.slice(
        currentPage * reviewsPerPage,
        (currentPage + 1) * reviewsPerPage
    );

    if (loading) {
        return (
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-100 rounded-lg h-48"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    const averageRating =
        reviews.reduce((sum, review) => sum + review.overallRating, 0) /
        reviews.length;

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Guest Reviews
                        </h2>
                        <div className="flex items-center gap-1">
                            {renderStars(averageRating)}
                            <span className="text-sm font-medium text-gray-900 ml-1">
                                {(averageRating / 2).toFixed(1)}
                            </span>
                        </div>
                        <span className="text-sm text-gray-600">
                            · {reviews.length} reviews
                        </span>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 text-sm">
                                            {review.guestName}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {renderStars(review.overallRating)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(
                                        review.submittedAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                    "{review.review}"
                                </p>
                            </div>

                            {/* Review Footer */}
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate max-w-[200px]">
                                        {review.listingName}
                                    </span>
                                </div>
                                <div className="capitalize">
                                    {review.channel}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage(Math.max(0, currentPage - 1))
                            }
                            disabled={currentPage === 0}
                            className="h-8 px-3 text-sm"
                        >
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i}
                                    variant={
                                        currentPage === i ? "default" : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setCurrentPage(i)}
                                    className="h-8 w-8 p-0 text-sm"
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(totalPages - 1, currentPage + 1)
                                )
                            }
                            disabled={currentPage === totalPages - 1}
                            className="h-8 px-3 text-sm"
                        >
                            Next
                            <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
