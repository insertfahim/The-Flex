import { PropertyReviewManagement } from "@/components/property-review-management";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface PropertyReviewManagementPageProps {
    params: {
        slug: string;
    };
}

export default async function PropertyReviewManagementPage({
    params,
}: PropertyReviewManagementPageProps) {
    const { slug } = params;

    // Find the property by slug to get its name
    const property = await prisma.property.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FFFDF6" }}>
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-6">
                    <nav
                        className="flex items-center space-x-2 text-sm mb-4"
                        style={{ color: "#5C5C5A" }}
                    >
                        <a href="/dashboard" className="hover:underline">
                            Dashboard
                        </a>
                        <span>/</span>
                        <a href="/properties" className="hover:underline">
                            Properties
                        </a>
                        <span>/</span>
                        <a
                            href={`/property/${slug}`}
                            className="hover:underline"
                        >
                            {property.name}
                        </a>
                        <span>/</span>
                        <span>Review Management</span>
                    </nav>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className="text-3xl font-bold mb-2"
                                style={{ color: "#333333" }}
                            >
                                Review Management
                            </h1>
                            <p className="text-lg" style={{ color: "#5C5C5A" }}>
                                Manage reviews for{" "}
                                <span className="font-medium">
                                    {property.name}
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`/property/${slug}`}
                                className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                                style={{
                                    borderColor: "#284E4C",
                                    color: "#284E4C",
                                }}
                            >
                                View Property Page
                            </a>
                            <a
                                href={`/property/${slug}#reviews`}
                                className="px-4 py-2 rounded-md text-white hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: "#284E4C" }}
                            >
                                View Public Reviews
                            </a>
                        </div>
                    </div>
                </div>

                {/* Review Management Component */}
                <PropertyReviewManagement
                    propertySlug={slug}
                    propertyName={property.name}
                    showApprovalActions={true}
                />
            </div>
        </div>
    );
}
