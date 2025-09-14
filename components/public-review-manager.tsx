"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Globe,
    Eye,
    EyeOff,
    Star,
    Calendar,
    User,
    MessageSquare,
    Check,
    X,
    Search,
    Filter,
    RotateCcw,
    ExternalLink,
    CheckSquare,
    Square,
    Save,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import type { NormalizedReview } from "@/types/review";

interface PublicReviewManagerProps {
    reviews: NormalizedReview[];
    propertyFilter?: string;
    onUpdateReview?: (
        reviewId: number,
        updates: Partial<NormalizedReview>
    ) => void;
}

export function PublicReviewManager({
    reviews,
    propertyFilter,
    onUpdateReview,
}: PublicReviewManagerProps) {
    const [selectedReviews, setSelectedReviews] = useState<Set<number>>(
        new Set()
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [ratingFilter, setRatingFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [channelFilter, setChannelFilter] = useState<string>("all");
    const [propertyFilterLocal, setPropertyFilterLocal] = useState<string>(
        propertyFilter || "all"
    );
    const [previewReview, setPreviewReview] = useState<NormalizedReview | null>(
        null
    );
    const [saving, setSaving] = useState(false);

    // Filter and prepare reviews
    const filteredReviews = useMemo(() => {
        // Safety check for undefined/null reviews
        if (!reviews || !Array.isArray(reviews)) {
            return [];
        }

        let filtered = reviews.filter((review) => {
            // Only show approved reviews
            if (!review.isApproved) return false;

            // Property filter
            if (
                propertyFilterLocal !== "all" &&
                review.listingName !== propertyFilterLocal
            ) {
                return false;
            }

            // Search filter
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                if (
                    !review.review.toLowerCase().includes(searchLower) &&
                    !review.guestName.toLowerCase().includes(searchLower) &&
                    !review.listingName.toLowerCase().includes(searchLower)
                ) {
                    return false;
                }
            }

            // Rating filter
            if (ratingFilter !== "all") {
                const minRating = parseInt(ratingFilter);
                if (review.overallRating < minRating) return false;
            }

            // Channel filter
            if (channelFilter !== "all" && review.channel !== channelFilter) {
                return false;
            }

            // Status filter (public display status)
            if (statusFilter !== "all") {
                const isPubliclyDisplayed = review.isApproved; // Simplified for demo
                if (statusFilter === "displayed" && !isPubliclyDisplayed)
                    return false;
                if (statusFilter === "hidden" && isPubliclyDisplayed)
                    return false;
            }

            return true;
        });

        // Sort by rating (highest first) and then by date (newest first)
        return filtered.sort((a, b) => {
            if (b.overallRating !== a.overallRating) {
                return b.overallRating - a.overallRating;
            }
            return b.submittedAt.getTime() - a.submittedAt.getTime();
        });
    }, [
        reviews,
        searchQuery,
        ratingFilter,
        statusFilter,
        channelFilter,
        propertyFilterLocal,
    ]);

    // Get unique properties for filter
    const properties = useMemo(() => {
        if (!reviews || !Array.isArray(reviews)) {
            return [];
        }
        return [...new Set(reviews.map((r) => r.listingName))];
    }, [reviews]);

    // Get unique channels for filter
    const channels = useMemo(() => {
        if (!reviews || !Array.isArray(reviews)) {
            return [];
        }
        return [...new Set(reviews.map((r) => r.channel))];
    }, [reviews]);

    // Handle individual review selection
    const handleReviewSelect = (reviewId: number, selected: boolean) => {
        const newSelected = new Set(selectedReviews);
        if (selected) {
            newSelected.add(reviewId);
        } else {
            newSelected.delete(reviewId);
        }
        setSelectedReviews(newSelected);
    };

    // Handle select all/none
    const handleSelectAll = () => {
        if (selectedReviews.size === filteredReviews.length) {
            setSelectedReviews(new Set());
        } else {
            setSelectedReviews(new Set(filteredReviews.map((r) => r.id)));
        }
    };

    // Handle bulk actions
    const handleBulkPublicDisplay = async (shouldDisplay: boolean) => {
        setSaving(true);
        try {
            // In a real app, this would make API calls to update the reviews
            for (const reviewId of selectedReviews) {
                if (onUpdateReview) {
                    onUpdateReview(reviewId, { isApproved: shouldDisplay });
                }
            }
            setSelectedReviews(new Set());
        } catch (error) {
            console.error("Error updating reviews:", error);
        } finally {
            setSaving(false);
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setRatingFilter("all");
        setStatusFilter("all");
        setChannelFilter("all");
        setPropertyFilterLocal(propertyFilter || "all");
    };

    // Render star rating
    const renderStarRating = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                            i < Math.floor(rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                        }`}
                    />
                ))}
                <span className="ml-2 text-sm font-medium">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    const stats = {
        total: filteredReviews.length,
        displayed: filteredReviews.filter((r) => r.isApproved).length,
        hidden: filteredReviews.filter((r) => !r.isApproved).length,
        selected: selectedReviews.size,
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Public Review Manager
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                                Control which reviews are displayed on your
                                public property pages
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>{stats.displayed} Displayed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                    <span>{stats.hidden} Hidden</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>{stats.selected} Selected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search reviews, guests, or properties..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                value={propertyFilterLocal}
                                onValueChange={setPropertyFilterLocal}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Properties" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Properties
                                    </SelectItem>
                                    {properties.map((property) => (
                                        <SelectItem
                                            key={property}
                                            value={property}
                                        >
                                            {property}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={ratingFilter}
                                onValueChange={setRatingFilter}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Ratings
                                    </SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                    <SelectItem value="4">4+ Stars</SelectItem>
                                    <SelectItem value="3">3+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={channelFilter}
                                onValueChange={setChannelFilter}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Channel" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Channels
                                    </SelectItem>
                                    {channels.map((channel) => (
                                        <SelectItem
                                            key={channel}
                                            value={channel}
                                        >
                                            {channel}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Bulk Actions */}
                        {selectedReviews.size > 0 && (
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-blue-900">
                                        {selectedReviews.size} review(s)
                                        selected
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            handleBulkPublicDisplay(true)
                                        }
                                        disabled={saving}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Globe className="h-4 w-4 mr-2" />
                                        Show Public
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleBulkPublicDisplay(false)
                                        }
                                        disabled={saving}
                                    >
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        Hide Public
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedReviews(new Set())
                                        }
                                    >
                                        Clear Selection
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleSelectAll}
                                >
                                    {selectedReviews.size ===
                                    filteredReviews.length ? (
                                        <Square className="h-4 w-4 mr-2" />
                                    ) : (
                                        <CheckSquare className="h-4 w-4 mr-2" />
                                    )}
                                    {selectedReviews.size ===
                                    filteredReviews.length
                                        ? "Deselect All"
                                        : "Select All"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={clearFilters}
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                            <div className="text-sm text-gray-600">
                                Showing {filteredReviews.length} of{" "}
                                {reviews.filter((r) => r.isApproved).length}{" "}
                                approved reviews
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredReviews.map((review) => (
                    <Card
                        key={review.id}
                        className={`transition-all ${
                            selectedReviews.has(review.id)
                                ? "ring-2 ring-blue-500 border-blue-200"
                                : "hover:shadow-md"
                        }`}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedReviews.has(review.id)}
                                        onCheckedChange={(checked: boolean) =>
                                            handleReviewSelect(
                                                review.id,
                                                checked
                                            )
                                        }
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {review.guestName}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {review.listingName}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="capitalize"
                                    >
                                        {review.channel}
                                    </Badge>
                                    <Badge
                                        className={
                                            review.isApproved
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                        }
                                    >
                                        {review.isApproved ? (
                                            <>
                                                <Globe className="h-3 w-3 mr-1" />
                                                Public
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="h-3 w-3 mr-1" />
                                                Hidden
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Rating */}
                            <div className="flex items-center justify-between">
                                {renderStarRating(review.overallRating)}
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {review.submittedAt.toLocaleDateString()}
                                </div>
                            </div>

                            {/* Review Text */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-gray-700 line-clamp-3">
                                    {review.review}
                                </p>
                            </div>

                            {/* Category Scores */}
                            {Object.keys(review.categories).length > 0 && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {Object.entries(review.categories)
                                        .slice(0, 4)
                                        .map(([category, score]) => (
                                            <div
                                                key={category}
                                                className="flex justify-between"
                                            >
                                                <span className="capitalize text-gray-600">
                                                    {category}:
                                                </span>
                                                <span className="font-medium">
                                                    {score}/5
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t">
                                <div className="flex items-center gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    setPreviewReview(review)
                                                }
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Preview
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Public Display Preview
                                                </DialogTitle>
                                                <DialogDescription>
                                                    How this review will appear
                                                    on your public property page
                                                </DialogDescription>
                                            </DialogHeader>
                                            {previewReview && (
                                                <div className="bg-gray-50 rounded-lg p-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-semibold text-lg">
                                                                    {
                                                                        previewReview.guestName
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    Stayed in{" "}
                                                                    {previewReview.submittedAt.toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                            {renderStarRating(
                                                                previewReview.overallRating
                                                            )}
                                                        </div>
                                                        <p className="text-gray-700">
                                                            {
                                                                previewReview.review
                                                            }
                                                        </p>
                                                        {Object.keys(
                                                            previewReview.categories
                                                        ).length > 0 && (
                                                            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                                                                {Object.entries(
                                                                    previewReview.categories
                                                                ).map(
                                                                    ([
                                                                        category,
                                                                        score,
                                                                    ]) => (
                                                                        <div
                                                                            key={
                                                                                category
                                                                            }
                                                                            className="flex justify-between"
                                                                        >
                                                                            <span className="capitalize text-sm">
                                                                                {
                                                                                    category
                                                                                }
                                                                            </span>
                                                                            <div className="flex items-center">
                                                                                {[
                                                                                    ...Array(
                                                                                        5
                                                                                    ),
                                                                                ].map(
                                                                                    (
                                                                                        _,
                                                                                        i
                                                                                    ) => (
                                                                                        <Star
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className={`h-3 w-3 ${
                                                                                                i <
                                                                                                Math.floor(
                                                                                                    score
                                                                                                )
                                                                                                    ? "text-yellow-400 fill-current"
                                                                                                    : "text-gray-300"
                                                                                            }`}
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <DialogFooter>
                                                <Link
                                                    href={`/property/${previewReview?.listingName
                                                        ?.toLowerCase()
                                                        .replace(/\s+/g, "-")}`}
                                                >
                                                    <Button variant="outline">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View Live Page
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() =>
                                                        setPreviewReview(null)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="flex items-center gap-2">
                                    {review.isApproved ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                if (onUpdateReview) {
                                                    onUpdateReview(review.id, {
                                                        isApproved: false,
                                                    });
                                                }
                                            }}
                                        >
                                            <EyeOff className="h-4 w-4 mr-2" />
                                            Hide
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                if (onUpdateReview) {
                                                    onUpdateReview(review.id, {
                                                        isApproved: true,
                                                    });
                                                }
                                            }}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <Globe className="h-4 w-4 mr-2" />
                                            Show Public
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredReviews.length === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No reviews found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            No approved reviews match your current filters.
                        </p>
                        <Button variant="outline" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
