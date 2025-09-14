import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const reviewId = Number.parseInt(params.id);
        if (isNaN(reviewId)) {
            return NextResponse.json(
                { error: "Invalid review ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { approved, managerNotes, updatedBy } = body;

        if (typeof approved !== "boolean") {
            return NextResponse.json(
                { error: "approved field is required and must be boolean" },
                { status: 400 }
            );
        }

        // Check if review exists
        const existingReview = await prisma.review.findUnique({
            where: { id: reviewId },
        });

        if (!existingReview) {
            return NextResponse.json(
                { error: "Review not found" },
                { status: 404 }
            );
        }

        // Update the review in the database
        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                isApproved: approved,
                managerNotes: managerNotes || null,
                status: approved ? "PUBLISHED" : "REJECTED",
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: `Review ${reviewId} ${approved ? "approved" : "rejected"}`,
            data: {
                id: reviewId,
                isApproved: approved,
                managerNotes,
                updatedAt: updatedReview.updatedAt,
                updatedBy: updatedBy,
            },
        });
    } catch (error) {
        console.error("Error approving review:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update review approval status",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
