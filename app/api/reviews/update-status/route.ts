import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { reviewId, status, isApproved } = await request.json();

        if (!reviewId || !status) {
            return NextResponse.json(
                { success: false, error: "Missing reviewId or status" },
                { status: 400 }
            );
        }

        // Update the review in the database
        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                status: status,
                isApproved: isApproved,
                updatedAt: new Date(),
            },
        });

        console.log(
            `✅ Review ${reviewId} status updated to ${status} (approved: ${isApproved})`
        );

        const response = NextResponse.json({
            success: true,
            data: updatedReview,
            message: `Review status updated to ${status}`,
        });

        // Ensure no caching for real-time updates
        response.headers.set(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        );

        return response;
    } catch (error) {
        console.error("Error updating review status:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update review status",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
