"use client";

import { PropertiesOverview } from "@/components/properties-overview";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertiesPage() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#FFFDF6" }}
        >
            {/* Header spacing */}
            <div style={{ paddingTop: "88px" }} />

            <main className="flex-grow">
                <div className="container mx-auto max-w-7xl px-3 md:px-4 py-8">
                    {/* Properties Overview with full functionality */}
                    <PropertiesOverview
                        showAll={true}
                        title="Our Properties"
                        subtitle="Discover our collection of premium apartments and townhouses across London's most desirable neighborhoods."
                        compact={true}
                    />

                    {/* CTA Section */}
                    <div className="bg-[#284E4C] rounded-2xl p-8 md:p-12 text-center text-white mt-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
                            Our team is here to help you find the perfect
                            accommodation for your stay in London. Contact us
                            for personalized recommendations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-white text-[#284E4C] hover:bg-gray-100"
                                >
                                    Contact Us
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-[#284E4C]"
                            >
                                View All Locations
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
