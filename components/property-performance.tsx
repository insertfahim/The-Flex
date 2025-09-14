"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Star,
    TrendingUp,
    TrendingDown,
    MapPin,
    Users,
    MessageSquare,
    AlertTriangle,
    CheckCircle,
    Clock,
    Search,
    Filter,
    BarChart3,
    Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NormalizedReview } from "@/types/review";

interface PropertyStats {
    id: number;
    name: string;
    location: string;
    image: string;
    totalReviews: number;
    averageRating: number;
    ratingChange: number;
    approvedReviews: number;
    pendingReviews: number;
    rejectedReviews: number;
    categoryScores: {
        cleanliness: number;
        communication: number;
        location: number;
        checkin: number;
        accuracy: number;
        value: number;
    };
    monthlyTrend: { month: string; rating: number; count: number }[];
    topIssues: string[];
    revenue: string;
    occupancy: number;
    status: "Active" | "Maintenance" | "Inactive";
    lastReviewDate: Date;
    channelBreakdown: { [key: string]: number };
}

interface PropertyPerformanceProps {
    reviews: NormalizedReview[];
}

export function PropertyPerformance({ reviews }: PropertyPerformanceProps) {
    const [sortBy, setSortBy] = useState<string>("rating");
    const [filterBy, setFilterBy] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
    const [apiPropertyStats, setApiPropertyStats] = useState<PropertyStats[]>(
        []
    );
    const [loading, setLoading] = useState(true);

    // Fetch property performance data from API
    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const response = await fetch("/api/properties/performance");
                const data = await response.json();
                if (data.success) {
                    setApiPropertyStats(data.data);
                }
            } catch (error) {
                console.error("Error fetching property data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, []);

    // Generate property statistics from reviews (fallback)
    const propertyStats = useMemo(() => {
        const statsMap: { [key: string]: PropertyStats } = {};

        // Filter reviews by time range
        const now = new Date();
        const timeRangeMs =
            {
                "7d": 7 * 24 * 60 * 60 * 1000,
                "30d": 30 * 24 * 60 * 60 * 1000,
                "90d": 90 * 24 * 60 * 60 * 1000,
                "1y": 365 * 24 * 60 * 60 * 1000,
            }[selectedTimeRange] || 30 * 24 * 60 * 60 * 1000;

        const cutoffDate = new Date(now.getTime() - timeRangeMs);
        const filteredReviews = reviews.filter(
            (review) => review.submittedAt >= cutoffDate
        );

        filteredReviews.forEach((review) => {
            const propertyName = review.listingName;

            if (!statsMap[propertyName]) {
                statsMap[propertyName] = {
                    id: Object.keys(statsMap).length + 1,
                    name: propertyName,
                    location: getLocationFromName(propertyName),
                    image: getImageFromName(propertyName),
                    totalReviews: 0,
                    averageRating: 0,
                    ratingChange: 0,
                    approvedReviews: 0,
                    pendingReviews: 0,
                    rejectedReviews: 0,
                    categoryScores: {
                        cleanliness: 0,
                        communication: 0,
                        location: 0,
                        checkin: 0,
                        accuracy: 0,
                        value: 0,
                    },
                    monthlyTrend: [],
                    topIssues: [],
                    revenue: generateRevenue(),
                    occupancy: Math.floor(Math.random() * 20) + 80,
                    status: Math.random() > 0.1 ? "Active" : "Maintenance",
                    lastReviewDate: new Date(),
                    channelBreakdown: {},
                };
            }

            const property = statsMap[propertyName];
            property.totalReviews++;

            if (review.isApproved) {
                property.approvedReviews++;
            } else if (review.status === "published") {
                property.pendingReviews++;
            } else if (review.status === "rejected") {
                property.rejectedReviews++;
            }

            // Update channel breakdown
            property.channelBreakdown[review.channel] =
                (property.channelBreakdown[review.channel] || 0) + 1;

            if (review.submittedAt > property.lastReviewDate) {
                property.lastReviewDate = review.submittedAt;
            }
        });

        // Calculate averages and trends
        Object.values(statsMap).forEach((property) => {
            const propertyReviews = filteredReviews.filter(
                (r) => r.listingName === property.name
            );

            if (propertyReviews.length > 0) {
                property.averageRating =
                    propertyReviews.reduce(
                        (sum, r) => sum + r.overallRating,
                        0
                    ) / propertyReviews.length;

                // Calculate category scores
                Object.keys(property.categoryScores).forEach((category) => {
                    const categoryReviews = propertyReviews.filter(
                        (r) =>
                            r.categories[category as keyof typeof r.categories]
                    );
                    if (categoryReviews.length > 0) {
                        property.categoryScores[
                            category as keyof typeof property.categoryScores
                        ] =
                            categoryReviews.reduce(
                                (sum, r) =>
                                    sum +
                                    (r.categories[
                                        category as keyof typeof r.categories
                                    ] || 0),
                                0
                            ) / categoryReviews.length;
                    }
                });

                // Calculate rating change (mock for now)
                property.ratingChange = (Math.random() - 0.5) * 0.6;

                // Generate monthly trend
                property.monthlyTrend = generateMonthlyTrend(propertyReviews);

                // Identify top issues
                property.topIssues = identifyTopIssues(propertyReviews);
            }
        });

        return Object.values(statsMap);
    }, [reviews, selectedTimeRange]);

    // Use API data if available, otherwise fallback to computed stats
    const finalPropertyStats =
        apiPropertyStats.length > 0 ? apiPropertyStats : propertyStats;

    // Apply filters and sorting
    const filteredAndSortedProperties = useMemo(() => {
        let filtered = finalPropertyStats;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (property) =>
                    property.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    property.location
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filterBy !== "all") {
            if (filterBy === "high-performing") {
                filtered = filtered.filter(
                    (property) => property.averageRating >= 4.5
                );
            } else if (filterBy === "needs-attention") {
                filtered = filtered.filter(
                    (property) =>
                        property.averageRating < 4.0 ||
                        property.pendingReviews > 5
                );
            } else if (filterBy === "pending-reviews") {
                filtered = filtered.filter(
                    (property) => property.pendingReviews > 0
                );
            } else {
                filtered = filtered.filter(
                    (property) => property.status === filterBy
                );
            }
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.averageRating - a.averageRating;
                case "reviews":
                    return b.totalReviews - a.totalReviews;
                case "pending":
                    return b.pendingReviews - a.pendingReviews;
                case "name":
                    return a.name.localeCompare(b.name);
                case "recent":
                    return (
                        b.lastReviewDate.getTime() - a.lastReviewDate.getTime()
                    );
                default:
                    return 0;
            }
        });

        return filtered;
    }, [finalPropertyStats, searchQuery, filterBy, sortBy]);

    const getPerformanceStatus = (property: PropertyStats) => {
        if (property.averageRating >= 4.5)
            return { label: "Excellent", color: "bg-green-500" };
        if (property.averageRating >= 4.0)
            return { label: "Good", color: "bg-blue-500" };
        if (property.averageRating >= 3.5)
            return { label: "Fair", color: "bg-yellow-500" };
        return { label: "Needs Attention", color: "bg-red-500" };
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                            i < Math.floor(rating / 2)
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

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-6 w-6 animate-spin text-[#284E4C]" />
                    <span className="ml-2 text-gray-600">
                        Loading property data...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters and Controls */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">
                                Property Performance
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                                Monitor performance across all{" "}
                                {finalPropertyStats.length} properties
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Select
                                value={selectedTimeRange}
                                onValueChange={setSelectedTimeRange}
                            >
                                <SelectTrigger className="w-32">
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
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search properties..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filterBy} onValueChange={setFilterBy}>
                            <SelectTrigger className="w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Properties
                                </SelectItem>
                                <SelectItem value="high-performing">
                                    High Performing
                                </SelectItem>
                                <SelectItem value="needs-attention">
                                    Needs Attention
                                </SelectItem>
                                <SelectItem value="pending-reviews">
                                    Pending Reviews
                                </SelectItem>
                                <SelectItem value="Active">
                                    Active Only
                                </SelectItem>
                                <SelectItem value="Maintenance">
                                    In Maintenance
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rating">
                                    By Rating
                                </SelectItem>
                                <SelectItem value="reviews">
                                    By Reviews
                                </SelectItem>
                                <SelectItem value="pending">
                                    By Pending
                                </SelectItem>
                                <SelectItem value="name">By Name</SelectItem>
                                <SelectItem value="recent">
                                    Most Recent
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Property Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProperties.map((property) => {
                    const performance = getPerformanceStatus(property);

                    return (
                        <Card
                            key={property.id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge
                                                className={`${performance.color} text-white text-xs`}
                                            >
                                                {performance.label}
                                            </Badge>
                                            <Badge
                                                variant={
                                                    property.status === "Active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                                className="text-xs"
                                            >
                                                {property.status}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg leading-tight">
                                            {property.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                            <MapPin className="h-3 w-3" />
                                            {property.location}
                                        </div>
                                    </div>
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                        <Image
                                            src={property.image}
                                            alt={property.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Rating and Reviews */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        {renderStars(property.averageRating)}
                                        <div className="flex items-center gap-1 text-sm">
                                            {property.ratingChange > 0 ? (
                                                <TrendingUp className="h-3 w-3 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 text-red-600" />
                                            )}
                                            <span
                                                className={
                                                    property.ratingChange > 0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }
                                            >
                                                {Math.abs(
                                                    property.ratingChange
                                                ).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-3 w-3" />
                                            {property.totalReviews} reviews
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {property.occupancy}% occupancy
                                        </div>
                                    </div>
                                </div>

                                {/* Review Status */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            Review Status
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {property.pendingReviews > 0 && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {property.pendingReviews}{" "}
                                                    pending
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>
                                                {property.approvedReviews}{" "}
                                                approved
                                            </span>
                                        </div>
                                        {property.rejectedReviews > 0 && (
                                            <div className="flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3 text-red-600" />
                                                <span>
                                                    {property.rejectedReviews}{" "}
                                                    rejected
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Category Scores */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">
                                        Category Performance
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {Object.entries(
                                            property.categoryScores
                                        ).map(([category, score]) => {
                                            if (score === 0) return null;
                                            return (
                                                <div
                                                    key={category}
                                                    className="flex items-center justify-between"
                                                >
                                                    <span className="capitalize text-gray-600">
                                                        {category.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </span>
                                                    <span className="font-medium">
                                                        {score.toFixed(1)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Top Issues */}
                                {property.topIssues.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-orange-600">
                                            Areas for Improvement
                                        </h4>
                                        <div className="space-y-1">
                                            {property.topIssues
                                                .slice(0, 2)
                                                .map((issue, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-xs text-gray-600 bg-orange-50 px-2 py-1 rounded"
                                                    >
                                                        {issue}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2 border-t">
                                    <Link
                                        href={`/dashboard/reviews?listing=${encodeURIComponent(
                                            property.name
                                        )}`}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Eye className="h-3 w-3 mr-1" />
                                            Reviews
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/dashboard/analytics?property=${encodeURIComponent(
                                            property.name
                                        )}`}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <BarChart3 className="h-3 w-3 mr-1" />
                                            Analytics
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredAndSortedProperties.length === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-gray-500">
                            No properties found matching your current filters.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setFilterBy("all");
                            }}
                            className="mt-4"
                        >
                            Clear Filters
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

// Helper functions
function getLocationFromName(name: string): string {
    if (name.toLowerCase().includes("shoreditch")) return "Shoreditch, London";
    if (name.toLowerCase().includes("canary")) return "Canary Wharf, London";
    if (name.toLowerCase().includes("fitzrovia")) return "Fitzrovia, London";
    if (name.toLowerCase().includes("paris")) return "Paris, France";
    if (name.toLowerCase().includes("algiers")) return "Algiers, Algeria";
    return "London, UK";
}

function getImageFromName(name: string): string {
    const images = [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
    ];
    return images[Math.floor(Math.random() * images.length)];
}

function generateRevenue(): string {
    const currencies = ["£", "€", "DA"];
    const amounts = [3200, 3800, 4200, 2800, 3500, 85000];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    return `${currency}${amount.toLocaleString()}`;
}

function generateMonthlyTrend(reviews: NormalizedReview[]) {
    // Generate simple monthly trend data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
        month,
        rating: 4.0 + Math.random() * 1.5,
        count: Math.floor(Math.random() * 10) + 5,
    }));
}

function identifyTopIssues(reviews: NormalizedReview[]): string[] {
    const issues = [
        "Cleanliness could be improved",
        "Check-in process needs streamlining",
        "Communication response time",
        "Location accessibility",
        "Amenities not as described",
        "Noise levels in the area",
    ];

    const lowRatingReviews = reviews.filter((r) => r.overallRating < 4.0);
    if (lowRatingReviews.length === 0) return [];

    return issues.slice(
        0,
        Math.min(3, Math.floor(lowRatingReviews.length / 2))
    );
}
