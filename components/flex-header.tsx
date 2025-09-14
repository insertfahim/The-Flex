"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FlexHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-[#284E4C] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=128&q=75"
                                alt="The Flex"
                                width={120}
                                height={32}
                                className="h-8 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/landlords"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Landlords
                        </Link>
                        <Link
                            href="/about"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/careers"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Careers
                        </Link>
                        <Link
                            href="/contact"
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/dashboard"
                            className="relative px-4 py-2 text-white border-2 border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-[#284E4C] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 backdrop-blur-sm animate-pulse hover:animate-none"
                        >
                            <span className="relative z-10">
                                ⚡ Manager Dashboard
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-lg blur-sm"></div>
                        </Link>
                        <div className="flex items-center space-x-4 text-white">
                            <span className="text-sm">GB English</span>
                            <span className="text-sm">£ GBP</span>
                        </div>
                    </nav>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-gray-200 hover:bg-[#1e3a38]"
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-[#1e3a38] py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/landlords"
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                Landlords
                            </Link>
                            <Link
                                href="/about"
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/careers"
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                Careers
                            </Link>
                            <Link
                                href="/contact"
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                Contact
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 text-white border-2 border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-[#284E4C] transition-all duration-300 font-semibold bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 text-center"
                            >
                                ⚡ Manager Dashboard
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
