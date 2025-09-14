"use client";

import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
    Eye,
    MessageSquare,
    Calendar,
    Filter,
    Search,
    Bell,
    Settings,
    Download,
    Plus,
    BarChart3,
    PieChart,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Edit,
    Trash2,
    ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ManagerDashboard() {
    const [timeRange, setTimeRange] = useState("30d");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Sample data - in real app this would come from API
    const dashboardStats = {
        totalRevenue: 245680,
        revenueChange: 12.5,
        totalProperties: 47,
        propertiesChange: 3.2,
        totalReviews: 1284,
        reviewsChange: 8.7,
        averageRating: 4.8,
        ratingChange: 0.3,
        occupancyRate: 92,
        occupancyChange: -2.1,
        responseRate: 96,
        responseChange: 4.2,
    };

    const recentProperties = [
        {
            id: 1,
            name: "Modern Loft in Shoreditch",
            location: "London, UK",
            status: "Active",
            rating: 4.9,
            reviews: 127,
            revenue: "£4,200",
            occupancy: 95,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
        },
        {
            id: 2,
            name: "Cozy Studio in Montmartre",
            location: "Paris, France",
            status: "Active",
            rating: 4.7,
            reviews: 89,
            revenue: "€3,800",
            occupancy: 88,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
        },
        {
            id: 3,
            name: "Luxury Apartment Downtown",
            location: "Algiers, Algeria",
            status: "Maintenance",
            rating: 4.6,
            reviews: 56,
            revenue: "DA 85,000",
            occupancy: 0,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
        },
    ];

    const recentReviews = [
        {
            id: 1,
            guest: "Sarah Johnson",
            property: "Modern Loft in Shoreditch",
            rating: 5,
            comment:
                "Absolutely fantastic stay! The property was immaculate and the location perfect.",
            date: "2 hours ago",
            status: "approved",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        },
        {
            id: 2,
            guest: "Michael Chen",
            property: "Cozy Studio in Montmartre",
            rating: 4,
            comment:
                "Great location and clean apartment. Would definitely stay again!",
            date: "5 hours ago",
            status: "pending",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        },
        {
            id: 3,
            guest: "Emma Wilson",
            property: "Luxury Apartment Downtown",
            rating: 5,
            comment:
                "The host was incredibly responsive and the apartment exceeded expectations.",
            date: "1 day ago",
            status: "approved",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        },
    ];

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
                                            3 new notifications
                                        </span>
                                    </div>
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
                                <Button className="bg-white/10 hover:bg-white/20 border-white/20">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                        <Card className="bg-white shadow-lg border-0">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <DollarSign className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 text-sm ${
                                            dashboardStats.revenueChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.revenueChange > 0 ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4" />
                                        )}
                                        {Math.abs(dashboardStats.revenueChange)}
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
                                            dashboardStats.propertiesChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.propertiesChange > 0 ? (
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
                                            dashboardStats.ratingChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.ratingChange > 0 ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4" />
                                        )}
                                        {Math.abs(dashboardStats.ratingChange)}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {dashboardStats.averageRating}
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
                                            dashboardStats.reviewsChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.reviewsChange > 0 ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4" />
                                        )}
                                        {Math.abs(dashboardStats.reviewsChange)}
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
                                            dashboardStats.occupancyChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.occupancyChange > 0 ? (
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
                                            dashboardStats.responseChange > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {dashboardStats.responseChange > 0 ? (
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
                </div>

                {/* Quick Actions */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
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
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Properties Management */}
                        <div className="xl:col-span-2">
                            <Card className="bg-white shadow-lg border-0">
                                <CardHeader className="pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                Property Management
                                            </CardTitle>
                                            <p className="text-gray-600 mt-1">
                                                Monitor and manage your
                                                properties
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="Search properties..."
                                                    className="pl-10 w-64"
                                                    value={searchQuery}
                                                    onChange={(e) =>
                                                        setSearchQuery(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <Button className="bg-[#284E4C] hover:bg-[#1e3a38]">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Property
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {recentProperties.map((property) => (
                                            <div
                                                key={property.id}
                                                className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                                                    <Image
                                                        src={property.image}
                                                        alt={property.name}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                                {property.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                                <MapPin className="h-4 w-4" />
                                                                <span className="text-sm">
                                                                    {
                                                                        property.location
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                variant={
                                                                    property.status ===
                                                                    "Active"
                                                                        ? "default"
                                                                        : "secondary"
                                                                }
                                                                className={
                                                                    property.status ===
                                                                    "Active"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                }
                                                            >
                                                                {
                                                                    property.status
                                                                }
                                                            </Badge>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                        <div>
                                                            <div className="flex items-center gap-1 mb-1">
                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                                <span className="font-semibold">
                                                                    {
                                                                        property.rating
                                                                    }
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600">
                                                                {
                                                                    property.reviews
                                                                }{" "}
                                                                reviews
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-green-600">
                                                                {
                                                                    property.revenue
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Monthly revenue
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">
                                                                {
                                                                    property.occupancy
                                                                }
                                                                %
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Occupancy
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <ExternalLink className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View All Properties
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Reviews Management */}
                        <div>
                            <Card className="bg-white shadow-lg border-0">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-bold text-gray-900">
                                                Recent Reviews
                                            </CardTitle>
                                            <p className="text-gray-600 mt-1 text-sm">
                                                Latest guest feedback
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {recentReviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border-b border-gray-100 pb-6 last:border-0"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="relative w-10 h-10 flex-shrink-0">
                                                        <Image
                                                            src={review.avatar}
                                                            alt={review.guest}
                                                            fill
                                                            className="object-cover rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                                {review.guest}
                                                            </h4>
                                                            <div className="flex items-center gap-1">
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <Star
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`h-3 w-3 ${
                                                                                i <
                                                                                review.rating
                                                                                    ? "text-yellow-400 fill-current"
                                                                                    : "text-gray-300"
                                                                            }`}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mb-2">
                                                            {review.property}
                                                        </p>
                                                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                                            {review.comment}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs text-gray-500">
                                                                {review.date}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <Badge
                                                                    variant={
                                                                        review.status ===
                                                                        "approved"
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                    className={`text-xs ${
                                                                        review.status ===
                                                                        "approved"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-yellow-100 text-yellow-800"
                                                                    }`}
                                                                >
                                                                    {
                                                                        review.status
                                                                    }
                                                                </Badge>
                                                                {review.status ===
                                                                    "pending" && (
                                                                    <div className="flex gap-1">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="h-6 px-2"
                                                                        >
                                                                            <CheckCircle className="h-3 w-3" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="h-6 px-2"
                                                                        >
                                                                            <XCircle className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View All Reviews
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Chart */}
                            <Card className="bg-white shadow-lg border-0 mt-6">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900">
                                        Performance Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Revenue Growth
                                                </span>
                                                <span className="text-sm font-semibold text-green-600">
                                                    +12.5%
                                                </span>
                                            </div>
                                            <Progress
                                                value={75}
                                                className="h-2"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Occupancy Rate
                                                </span>
                                                <span className="text-sm font-semibold">
                                                    92%
                                                </span>
                                            </div>
                                            <Progress
                                                value={92}
                                                className="h-2"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Guest Satisfaction
                                                </span>
                                                <span className="text-sm font-semibold text-green-600">
                                                    4.8/5
                                                </span>
                                            </div>
                                            <Progress
                                                value={96}
                                                className="h-2"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Response Time
                                                </span>
                                                <span className="text-sm font-semibold">
                                                    &lt; 2hrs
                                                </span>
                                            </div>
                                            <Progress
                                                value={85}
                                                className="h-2"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <FlexFooter />
        </div>
    );
}
