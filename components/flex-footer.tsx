import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function FlexFooter() {
    return (
        <footer className="bg-[#284E4C] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Newsletter Signup */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">
                            Join The Flex
                        </h3>
                        <p className="text-gray-200 mb-6 leading-relaxed">
                            Sign up now and stay up to date on our latest news
                            and exclusive deals including 5% off your first
                            stay!
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    placeholder="First name"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                                />
                                <Input
                                    placeholder="Last name"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                                />
                            </div>
                            <Input
                                placeholder="Email address"
                                type="email"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                            />
                            <div className="flex">
                                <select className="bg-white/10 border border-white/20 rounded-l-md px-3 py-2 text-white text-sm">
                                    <option value="+44">🇬🇧 +44</option>
                                </select>
                                <Input
                                    placeholder="Phone number"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 rounded-l-none border-l-0"
                                />
                            </div>
                            <Button className="w-full bg-white text-[#284E4C] hover:bg-gray-100 font-semibold">
                                ✈️ Subscribe
                            </Button>
                        </div>
                    </div>

                    {/* The Flex */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">The Flex</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            Professional property management services for
                            landlords, flexible corporate lets for businesses
                            and quality accommodations for short-term and
                            long-term guests.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                            <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                            <Linkedin className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-200 hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-gray-200 hover:text-white"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-gray-200 hover:text-white"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-gray-200 hover:text-white"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Locations & Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Locations
                        </h3>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="text-gray-200">LONDON</li>
                            <li className="text-gray-200">PARIS</li>
                            <li className="text-gray-200">ALGIERS</li>
                        </ul>

                        <h3 className="text-lg font-semibold mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <div className="text-gray-200">
                                    📞 Support Numbers
                                </div>
                                <div className="text-gray-200">
                                    🇬🇧 United Kingdom
                                </div>
                                <div className="text-white">
                                    +44 77 2374 5646
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-200">🇩🇿 Algeria</div>
                                <div className="text-white">
                                    +33 7 57 59 22 41
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-200">🇫🇷 France</div>
                                <div className="text-white">
                                    +33 6 44 64 57 17
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="text-white">
                                    📧 info@theflex.global
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-12 pt-8 text-center">
                    <p className="text-gray-200 text-sm">
                        © 2025 The Flex. All rights reserved.
                    </p>
                </div>
            </div>

            {/* WhatsApp Widget */}
            <div className="fixed bottom-6 right-6 z-50 group">
                {/* Chat Bubble - appears on hover */}
                <div className="absolute bottom-20 right-0 bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-2xl max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                                Have any questions? Let's chat! 👋
                            </div>
                            <div className="text-xs text-gray-500">
                                Click here to start a conversation
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 ml-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Chat bubble pointer */}
                    <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                </div>

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/447723745646?text=Hi%20there!%20I%27m%20interested%20in%20learning%20more%20about%20The%20Flex%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div className="bg-green-500 text-white p-4 rounded-full shadow-xl cursor-pointer hover:bg-green-600 transition-all duration-300 hover:scale-105">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                        </svg>
                    </div>
                </a>
            </div>
        </footer>
    );
}
