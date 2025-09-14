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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    TrendingUp,
    Shield,
    Home,
    Users,
    Star,
    DollarSign,
    Clock,
    CheckCircle,
    ArrowRight,
    Download,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Award,
    Zap,
    Target,
    PiggyBank,
    Wrench,
    Eye,
    FileText,
    MessageSquare,
    ChevronRight,
    Play,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function LandlordsPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        bedrooms: "",
    });

    const [downloadFormData, setDownloadFormData] = useState({
        address: "",
        fullName: "",
        email: "",
        bedrooms: "",
        phone: "",
    });

    const benefits = [
        {
            icon: DollarSign,
            title: "Guaranteed Monthly Income",
            description:
                'Lock in predictable cash-flow from day one: the agreed rent lands in your account every month, occupancy or not. No chasing payments, no "dead" weeks between tenants—just reliable income you can bank on.',
            color: "bg-green-500",
        },
        {
            icon: TrendingUp,
            title: "Premium Rental Yields",
            description:
                "Unlock higher returns with our data-driven pricing engine that continually adjusts rates to market demand, maximising occupancy and boosting your net income beyond traditional tenancies.",
            color: "bg-blue-500",
        },
        {
            icon: Shield,
            title: "Long Term Partnerships",
            description:
                "Enjoy a multi-year lease populated by vetted travellers. These low-risk occupants mean less wear-and-tear and a long-term partnership – with an easier break option than a typical AST should your plans change.",
            color: "bg-purple-500",
        },
    ];

    const howItWorksSteps = [
        {
            icon: MessageSquare,
            title: "Get in Touch",
            description:
                "Complete the quick valuation form at the top of this page and we will get in touch as soon as possible.",
        },
        {
            icon: Phone,
            title: "Let's Chat",
            description:
                "We will arrange a brief video call to go through your requirements and discuss your property.",
        },
        {
            icon: FileText,
            title: "Contract Signature",
            description:
                "We agree on the terms of service and sign a mutually beneficial contract within our proven model.",
        },
        {
            icon: Home,
            title: "Time to Decorate",
            description:
                "Our team of interior designers and decorators will transform your property with new furniture, artwork and the latest technology.",
        },
        {
            icon: PiggyBank,
            title: "Sit Back & Relax",
            description:
                "You will receive a fixed monthly rental income while we take care of everything else for the rest of the year.",
        },
    ];

    const services = [
        {
            icon: Wrench,
            title: "Property Management",
            description:
                "Marketing, guest vetting, housekeeping, basic maintenance and monthly inspections are all handled by our expert in-house team, so you never lift a finger or pay unexpected management fees.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
        },
        {
            icon: Home,
            title: "Property Upgrade",
            description:
                "We refresh your space with tasteful, value-boosting furnishings and décor at our expense, then provide routine upkeep and rapid-response repairs —protecting and often enhancing the long-term value of your asset.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        },
        {
            icon: Users,
            title: "Vetted Tenants",
            description:
                "Apartments are occupied by screened business travellers and relocating professionals through our corporate partnerships – reducing wear-and-tear risk among other typical short-let headaches.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
        },
    ];

    const corporateLogos = [
        {
            name: "PWC",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/PwC-Logo.png",
        },
        {
            name: "KPMG",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/KPMG-Logo.png",
        },
        {
            name: "Allianz",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/Allianz-Logo.png",
        },
        {
            name: "L'Oreal",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/LOreal-Logo.png",
        },
        {
            name: "Amazon",
            logo: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
        },
        {
            name: "Google",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png",
        },
        {
            name: "Apple",
            logo: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
        },
        {
            name: "Microsoft",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png",
        },
    ];

    const transformationImages = [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ];

    const faqs = [
        {
            question: "Who will be living in my property?",
            answer: "Your property will be occupied by vetted business travelers and relocating professionals through our corporate partnerships. These are screened individuals who require quality accommodations for work purposes, ensuring responsible and respectful occupancy.",
        },
        {
            question: "How long does your average tenant stay for?",
            answer: "Our corporate tenants typically stay for 3-12 months, with many extending their stays. This provides stability while avoiding the long-term commitment issues of traditional tenancies.",
        },
        {
            question: "How long do your agreements last?",
            answer: "We offer flexible agreements from 1-5 years, with options to extend or terminate with reasonable notice. This provides security for landlords while maintaining flexibility for changing circumstances.",
        },
        {
            question: "What happens to my furniture/fixings at the property?",
            answer: "We work with your existing furniture where possible and complement it with our premium furnishings. Any items we cannot use will be safely stored or returned to you at no cost.",
        },
        {
            question: "How will The Flex increase the value of my property?",
            answer: "We invest an average of £5,000 per property in tasteful upgrades, modern furnishings, and technology. These improvements often increase your property's long-term value while attracting premium tenants.",
        },
        {
            question: "How does The Flex profit with 0% management fees?",
            answer: "We generate revenue through our corporate partnerships and premium pricing model, allowing us to offer landlords 0% management fees while maintaining profitability through volume and efficiency.",
        },
        {
            question: "Does The Flex offer shared accommodation or HMOs?",
            answer: "We focus on high-quality, single-occupancy or family accommodations for corporate clients. We do not operate HMOs or shared accommodations to maintain our premium service standards.",
        },
    ];

    const blogPosts = [
        {
            title: "How Can You Rent Out a Help-to-Buy Property Legally in 2023?",
            excerpt:
                "Navigate the legal requirements and maximize your returns on Help-to-Buy properties.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
            link: "#",
        },
        {
            title: "Best Advice for Decorating Your New Build or Period Property",
            excerpt:
                "Want to refurbish your property but not sure where to start? We offer free refurbishment services for Flex Living landlords.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
            link: "#",
        },
        {
            title: "Electric Shower Won't Turn On? Fix Your Shower Problems",
            excerpt:
                "Do you want to upscale your property but are unsure where to start? Flex Living offers free property refurbishment services.",
            image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=250&fit=crop",
            link: "#",
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleDownloadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Download form submitted:", downloadFormData);
    };

    return (
        <div className="min-h-screen bg-white">
            <FlexHeader />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-br from-[#284E4C] to-[#1e3a38] text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    We offer freedom and{" "}
                                    <span className="text-yellow-400">
                                        guaranteed income
                                    </span>{" "}
                                    for property owners.
                                </h1>
                                <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                                    We cater to a select, high-end clientele
                                    seeking premium accommodations across London
                                    Property Management. To maintain our
                                    commitment to five-star hospitality, we
                                    conduct weekly professional cleanings,
                                    monthly inspections, and on-demand
                                    maintenance—all at no cost to you.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span>Guaranteed rent</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span>0% management fees</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                        <span>Premium tenants</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Check Your Eligibility
                                        </CardTitle>
                                        <p className="text-gray-600">
                                            Get a free property valuation and
                                            discover your earning potential
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <Input
                                                    placeholder="Enter your full name here"
                                                    value={formData.fullName}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            fullName:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="border-gray-200 focus:border-[#284E4C]"
                                                />
                                            </div>
                                            <div className="flex">
                                                <select className="border border-gray-200 rounded-l-md px-3 py-2 text-sm bg-white">
                                                    <option value="+44">
                                                        🇬🇧 +44
                                                    </option>
                                                    <option value="+33">
                                                        🇫🇷 +33
                                                    </option>
                                                    <option value="+213">
                                                        🇩🇿 +213
                                                    </option>
                                                </select>
                                                <Input
                                                    placeholder="Phone number"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="border-gray-200 focus:border-[#284E4C] rounded-l-none border-l-0"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email here"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="border-gray-200 focus:border-[#284E4C]"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    placeholder="Enter your property address"
                                                    value={formData.address}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            address:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="border-gray-200 focus:border-[#284E4C]"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full bg-[#284E4C] hover:bg-[#1e3a38] text-white font-semibold py-3"
                                            >
                                                Check Your Eligibility
                                                <ArrowRight className="h-5 w-5 ml-2" />
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Maximise Your Earnings
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                Say goodbye to agency fees, vacancies and
                                maintenance headaches. With The Flex&apos;s
                                guaranteed-rent model you enjoy a fixed monthly
                                payment — no voids, no hidden costs. So you
                                pocket up to 25% higher net income than with a
                                standard tenancy.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {benefits.map((benefit, index) => (
                                <Card
                                    key={index}
                                    className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow"
                                >
                                    <CardContent className="p-8">
                                        <div
                                            className={`inline-flex p-4 rounded-full ${benefit.color} mb-6`}
                                        >
                                            <benefit.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        <Card className="bg-white shadow-2xl border-0">
                            <CardHeader className="text-center pb-6">
                                <CardTitle className="text-3xl font-bold text-gray-900">
                                    Take home up to 25% more with The Flex
                                </CardTitle>
                                <p className="text-gray-600 mt-2">
                                    Illustrative comparison for a property
                                    letting at £30k per year
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200">
                                                <th className="text-left py-4 px-6 font-semibold text-gray-900"></th>
                                                <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-red-50 rounded-t-lg">
                                                    Traditional Agents
                                                </th>
                                                <th className="text-center py-4 px-6 font-semibold text-white bg-[#284E4C] rounded-t-lg">
                                                    The Flex
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-4 px-6 font-semibold text-gray-900">
                                                    Gross Rent
                                                </td>
                                                <td className="py-4 px-6 text-center bg-red-50">
                                                    £30,000
                                                </td>
                                                <td className="py-4 px-6 text-center bg-green-50">
                                                    £30,000
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-4 px-6 font-semibold text-gray-900">
                                                    Agency Fees
                                                </td>
                                                <td className="py-4 px-6 text-center bg-red-50 text-red-600">
                                                    - 10% + VAT
                                                </td>
                                                <td className="py-4 px-6 text-center bg-green-50 text-green-600">
                                                    £0
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-4 px-6 font-semibold text-gray-900">
                                                    Void Periods
                                                </td>
                                                <td className="py-4 px-6 text-center bg-red-50 text-red-600">
                                                    - 6%
                                                </td>
                                                <td className="py-4 px-6 text-center bg-green-50 text-green-600">
                                                    £0
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-4 px-6 font-semibold text-gray-900">
                                                    Maintenance Costs
                                                </td>
                                                <td className="py-4 px-6 text-center bg-red-50 text-red-600">
                                                    - 2.5%
                                                </td>
                                                <td className="py-4 px-6 text-center bg-green-50 text-green-600">
                                                    £0
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="py-6 px-6 font-bold text-gray-900 text-lg">
                                                    Take Home (Net)
                                                </td>
                                                <td className="py-6 px-6 text-center font-bold text-lg text-red-600">
                                                    £23,850
                                                </td>
                                                <td className="py-6 px-6 text-center font-bold text-lg text-green-600">
                                                    £30,000
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                How it Works
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                We offer guaranteed rent to landlords for up to
                                5 years – with 0% property management fees and
                                full peace of mind. The Flex partners with
                                trusted corporate clients who need high-quality,
                                fully furnished housing on flexible terms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {services.map((service, index) => (
                                <Card
                                    key={index}
                                    className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-[#284E4C] rounded-lg">
                                                <service.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Process Steps */}
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                Become a Flex Landlord
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                {howItWorksSteps.map((step, index) => (
                                    <div key={index} className="text-center">
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 bg-[#284E4C] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <step.icon className="h-10 w-10 text-white" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                                                {index + 1}
                                            </div>
                                            {index <
                                                howItWorksSteps.length - 1 && (
                                                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 transform translate-x-4"></div>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Download PDF Section */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Download Our Market Comparison Guide
                                </h2>
                                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                    Compare our model to the market and see how
                                    much more you could be earning with The
                                    Flex.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            Long term tenancy
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            Low wear & tear
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            No maintenance callout charges
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            Free weekly cleans
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            Vetted corporate tenants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">
                                            Monthly inspection checks
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Card className="bg-white shadow-2xl border-0">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        Get Your Free PDF Guide
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleDownloadSubmit}
                                        className="space-y-4"
                                    >
                                        <Input
                                            placeholder="Enter your property address"
                                            value={downloadFormData.address}
                                            onChange={(e) =>
                                                setDownloadFormData({
                                                    ...downloadFormData,
                                                    address: e.target.value,
                                                })
                                            }
                                            className="border-gray-200 focus:border-[#284E4C]"
                                        />
                                        <Input
                                            placeholder="Full name"
                                            value={downloadFormData.fullName}
                                            onChange={(e) =>
                                                setDownloadFormData({
                                                    ...downloadFormData,
                                                    fullName: e.target.value,
                                                })
                                            }
                                            className="border-gray-200 focus:border-[#284E4C]"
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Email address"
                                            value={downloadFormData.email}
                                            onChange={(e) =>
                                                setDownloadFormData({
                                                    ...downloadFormData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="border-gray-200 focus:border-[#284E4C]"
                                        />
                                        <Select
                                            value={downloadFormData.bedrooms}
                                            onValueChange={(value) =>
                                                setDownloadFormData({
                                                    ...downloadFormData,
                                                    bedrooms: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger className="border-gray-200 focus:border-[#284E4C]">
                                                <SelectValue placeholder="# of bedrooms" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1 bedroom
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    2 bedrooms
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3 bedrooms
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    4+ bedrooms
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex">
                                            <select className="border border-gray-200 rounded-l-md px-3 py-2 text-sm bg-white">
                                                <option value="+44">
                                                    🇬🇧 +44
                                                </option>
                                                <option value="+33">
                                                    🇫🇷 +33
                                                </option>
                                                <option value="+213">
                                                    🇩🇿 +213
                                                </option>
                                            </select>
                                            <Input
                                                placeholder="Phone number"
                                                value={downloadFormData.phone}
                                                onChange={(e) =>
                                                    setDownloadFormData({
                                                        ...downloadFormData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                className="border-gray-200 focus:border-[#284E4C] rounded-l-none border-l-0"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-[#284E4C] hover:bg-[#1e3a38] text-white font-semibold py-3"
                                        >
                                            <Download className="h-5 w-5 mr-2" />
                                            Download PDF
                                        </Button>
                                        <p className="text-xs text-gray-500 text-center">
                                            Please provide a correct email in
                                            order to receive the PDF
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Corporate Clients Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Our Corporate Clients
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                We establish trusted partnerships with our
                                corporate partners, providing accommodation to
                                employees relocating for work. Our clients
                                require quality living spaces in prime
                                locations, and they occupy these spaces
                                respectfully and responsibly.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
                            {corporateLogos.map((company, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center p-4"
                                >
                                    <div className="text-2xl font-bold text-gray-400">
                                        {company.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Property Transformation Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                We Transform Your Property
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                Our talented team of interior designers and
                                decorators will transform your property into a
                                premium listing free of charge. From feature
                                walls and artwork to the latest technology, we
                                have it covered. We spend on average £5,000 per
                                property, creating a desirable environment for
                                our corporate clients.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {transformationImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <Image
                                        src={image}
                                        alt={`Property transformation ${
                                            index + 1
                                        }`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Your Questions Answered
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                Ready to get started but still have questions?
                                Here are the most frequently asked questions to
                                our team.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b border-gray-200"
                                >
                                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-[#284E4C] transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700 leading-relaxed pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <div className="text-center mt-8">
                            <Button
                                variant="outline"
                                className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white"
                            >
                                See more
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Landlord Smarter, Not Harder
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                Stay ahead of the curve, amplify your rental
                                returns, and reclaim precious time with The Flex
                                Blog - your source for fresh takes on property
                                management, market moves, and next-level
                                landlord strategies.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {blogPosts.map((post, index) => (
                                <Card
                                    key={index}
                                    className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white"
                                        >
                                            Read More
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button className="bg-[#284E4C] hover:bg-[#1e3a38] text-white font-semibold px-8 py-3">
                                View All Landlord Articles
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <FlexFooter />
        </div>
    );
}
