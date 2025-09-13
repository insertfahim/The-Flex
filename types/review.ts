export interface HostawayReview {
    id: number;
    type: "host-to-guest" | "guest-to-host";
    status: "published" | "pending" | "rejected";
    rating: number | null;
    publicReview: string;
    reviewCategory: {
        category: string;
        rating: number;
    }[];
    submittedAt: string;
    guestName: string;
    listingName: string;
}

export interface NormalizedReview {
    id: number;
    type: "host-to-guest" | "guest-to-host";
    status: "published" | "pending" | "rejected";
    overallRating: number;
    review: string;
    categories: {
        cleanliness?: number;
        communication?: number;
        respect_house_rules?: number;
        location?: number;
        checkin?: number;
        accuracy?: number;
        value?: number;
    };
    submittedAt: Date;
    guestName: string;
    listingName: string;
    channel: "hostaway" | "google" | "airbnb";
    isApproved: boolean;
    managerNotes?: string;
}

export interface ReviewFilters {
    rating?: number;
    category?: string;
    channel?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    listing?: string;
}

export interface ReviewAnalytics {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { [key: number]: number };
    categoryAverages: { [key: string]: number };
    channelBreakdown: { [key: string]: number };
    monthlyTrends: { month: string; count: number; averageRating: number }[];
    topProperties: { name: string; count: number; averageRating: number }[];
    commonIssues: {
        issue: string;
        count: number;
        severity: "low" | "medium" | "high";
    }[];
    performanceAlerts?: {
        type: string;
        title: string;
        message: string;
        priority: string;
    }[];
}
