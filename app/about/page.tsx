"use client";

import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Users,
    TrendingUp,
    Clock,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Sid",
            role: "Chief Technology Officer",
            location: "Paris, France",
            interests: "Sports, History, Ethical Hacking",
            quote: "At The Flex, you're not just executing tasks, you're owning them. This is a place where responsibility meets purpose, and where every team member is empowered to think critically, challenge ideas, and bring bold solutions to the table. Innovation isn't top-down here, the best ideas can come from anyone! And when it comes to challenges, 'impossible' simply doesn't exist in our vocabulary. At The Flex, we make the unthinkable happen, every single day!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        },
        {
            name: "Zoe",
            role: "Chief of Staff",
            location: "Lisbon, Portugal",
            interests: "Sports, Music (Singing), Hikes & Nature!",
            quote: "After years in early-stage startups, I knew I never wanted a box-ticking, 'stay-in-your-lane' job. The Flex is the exact opposite. The founders hand you a problem or objective, give you full ownership to solve it your way, and offer confident course-corrections when you need them.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        },
        {
            name: "Latifa",
            role: "Distribution Manager",
            location: "Paris, France",
            interests: "Reading, cooking, family time",
            quote: "Working at The Flex means being part of a team that values innovation and personal growth. Every day brings new challenges and opportunities to make a real impact in the flexible living space.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
        },
        {
            name: "Rebecca",
            role: "Operations Manager",
            location: "London, UK",
            interests: "Sport, charity work, cooking & exploring cities",
            quote: "After 10 years in property management, I knew I thrived in fast paced, high responsibility environments. At The Flex, I lead both the operations & maintenance teams - where no two days are the same, and I'm trusted to take ownership & think on my feet.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        },
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <FlexHeader />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-br from-[#284E4C] to-[#1e3a38] text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            About The Flex
                        </h1>
                        <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                            Learn about The Flex story, founded by Raouf Yousfi
                            and Michael Buggy. Discover our mission to
                            revolutionize short-term rentals with flexible
                            solutions for landlords and tenants in London,
                            Paris, and Algiers.
                        </p>
                    </div>
                </section>

                {/* Redefining Home Section */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                    Redefining 'Home'
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    At The Flex, we believe 'home' should never
                                    limit your possibilities. We exist to
                                    redefine how people travel, live and work
                                    with solutions that prioritise freedom,
                                    adaptability, and flexibility.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Driven by genuine care and innovative
                                    thinking, we provide flexible accommodations
                                    that empower you to embrace life's changes -
                                    making sure you always feel grounded,
                                    wherever life takes you.
                                </p>
                            </div>
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                                    alt="Modern flexible living space"
                                    width={800}
                                    height={600}
                                    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Flexibility Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#020817] mb-8">
                                Flexibility for tenants, landlords & businesses
                            </h2>
                            <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
                                The Flex is the future of flexible
                                accommodation, powered by seasoned
                                property-management experts. Guests tap into
                                fully furnished, hotel-grade homes on leases
                                that bend with their plans, while landlords
                                enjoy guaranteed rent and zero voids as we
                                enhance, market, service and maintain every
                                unit.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Tenants Card */}
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"
                                        alt="Tenant enjoying flexible accommodation"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-[#020817] mb-6 text-center">
                                        Tenants
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Book a fully furnished, design-forward
                                        home in minutes and stay for a week, a
                                        season, or as long as your plans demand
                                        — fully furnished with utilities, Wi-Fi,
                                        and hotel-grade linens already in place.
                                        Digital key access, optional
                                        housekeeping, and 24/7 live support give
                                        you the comfort of a boutique hotel with
                                        the freedom of an apartment.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Landlords Card */}
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                                        alt="Happy landlord with guaranteed rent"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-[#020817] mb-6 text-center">
                                        Landlords
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Lock in guaranteed rent with zero voids
                                        from day one. Our team handles upgrades
                                        and improvements, dynamic pricing,
                                        resident vetting, regular cleaning,
                                        round-the-clock maintenance and
                                        everything in between whilst you sit
                                        back, relax and receive fixed monthly
                                        payments.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Businesses Card */}
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                                        alt="Business team in flexible workspace"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-[#020817] mb-6 text-center">
                                        Businesses
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        One master lease unlocks an entire
                                        portfolio of ready-to-live Flex homes
                                        across our rapidly expanding network—
                                        new properties added every week and new
                                        cities launching soon. Relocate
                                        employees in hours, spin up project
                                        teams on-site for a month, or house
                                        insurance policyholders instantly after
                                        a claim.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Mission and Values */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Mission */}
                            <div>
                                <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                    Our Mission
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    Driven by the prospect of an unbounded
                                    world, The Flex is on a mission to eliminate
                                    the constraints of traditional rental
                                    models. Our destination? A new realm where
                                    landlords no longer pay excessive management
                                    fees, and where renters can live flexibly
                                    and comfortably anywhere in the world.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    We are reimagining the idea of 'home' from
                                    something fixed to something flexible and
                                    simplifying the rental process for both
                                    landlords and tenants as we go.
                                </p>
                            </div>

                            {/* Values */}
                            <div>
                                <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                    Our Values
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    Our services are anchored by three guiding
                                    principles that set the tone for our every
                                    interaction – flexibility that removes
                                    hassle, quality in every detail, and speed
                                    that turns "someday" into "right now."
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#020817] mb-2">
                                            Flexibility
                                        </h3>
                                        <p className="text-gray-700">
                                            Shift dates, swap units, or relocate
                                            across borders with a few taps. Our
                                            platform lets tenants and landlords
                                            reshape terms on demand — no piles
                                            of paperwork, just living
                                            arrangements that adapt to real-life
                                            changes.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-[#020817] mb-2">
                                            Quality
                                        </h3>
                                        <p className="text-gray-700">
                                            Designer furnishings, hotel-grade
                                            bedding, spotless housekeeping, and
                                            contracts written in plain language.
                                            From first look to long-term care,
                                            every detail signals premium
                                            standards you can trust.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-[#020817] mb-2">
                                            Speed
                                        </h3>
                                        <p className="text-gray-700">
                                            Instant approvals and same-day
                                            move-ins for guests; rapid
                                            evaluations and fast payouts for
                                            landlords. With The Flex, answers
                                            appear quickly and actions follow
                                            even faster.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Where We Are Today
                            </h2>
                            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                Since 2019, The Flex has grown from a local
                                startup into a cross-border operator, delivering
                                exceptional property management services across
                                the UK, France, and Algeria. As we continue to
                                expand into new cities, add more homes to our
                                portfolio, and serve a growing community of
                                residents, our mission is simple: to help more
                                people live flexibly—on their own terms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="text-center p-8 bg-[#284E4C] text-white">
                                <Users className="h-16 w-16 mx-auto mb-4" />
                                <div className="text-4xl font-bold mb-2">
                                    650+
                                </div>
                                <div className="text-lg">Tenants Placed</div>
                            </Card>

                            <Card className="text-center p-8 bg-[#22C55E] text-white">
                                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                                <div className="text-4xl font-bold mb-2">
                                    £5M
                                </div>
                                <div className="text-lg">Rent Paid</div>
                            </Card>

                            <Card className="text-center p-8 bg-[#F59E0B] text-white">
                                <MapPin className="h-16 w-16 mx-auto mb-4" />
                                <div className="text-4xl font-bold mb-2">
                                    1000+
                                </div>
                                <div className="text-lg">
                                    Properties by 2027
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Our Story
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="p-8 bg-white shadow-lg">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                                        alt="Coffee meeting at Tower Bridge"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <Badge className="mb-4 bg-[#284E4C] text-white">
                                    Story 1
                                </Badge>
                                <p className="text-gray-700 leading-relaxed">
                                    "It all started with a coffee on a cobbled
                                    street overlooking London's Tower Bridge..."
                                </p>
                            </Card>

                            <Card className="p-8 bg-white shadow-lg">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop"
                                        alt="Founders meeting and collaboration"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <Badge className="mb-4 bg-[#284E4C] text-white">
                                    Story 2
                                </Badge>
                                <p className="text-gray-700 leading-relaxed">
                                    That's where our founders, Raouf and
                                    Michael, first connected over a shared
                                    vision – a world where people could live and
                                    work without constraints.
                                </p>
                            </Card>

                            <Card className="p-8 bg-white shadow-lg">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                                        alt="The Flex company launch"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <Badge className="mb-4 bg-[#284E4C] text-white">
                                    Story 3
                                </Badge>
                                <p className="text-gray-700 leading-relaxed">
                                    And just like that, The Flex was born – with
                                    a clear, two-part mission: To remove the
                                    friction from finding a rental home, and to
                                    transform the landlord experience through
                                    expert care and fair, transparent pricing.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Team Testimonials */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Hear From Our People
                            </h2>
                            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                Our team spans continents, disciplines, and life
                                stories, yet we're united by a shared drive to
                                solve bold problems, a bias for action, and an
                                uncompromising commitment to integrity.
                            </p>
                        </div>

                        <div className="relative">
                            <Card className="max-w-4xl mx-auto p-8 bg-gray-50">
                                <div className="flex items-center justify-between mb-6">
                                    <Button
                                        variant="ghost"
                                        onClick={prevTestimonial}
                                        className="p-2"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>

                                    <div className="text-center flex-1">
                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            <div className="relative w-16 h-16">
                                                <Image
                                                    src={
                                                        testimonials[
                                                            currentTestimonial
                                                        ].image
                                                    }
                                                    alt={
                                                        testimonials[
                                                            currentTestimonial
                                                        ].name
                                                    }
                                                    fill
                                                    className="object-cover rounded-full"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#020817]">
                                                    {
                                                        testimonials[
                                                            currentTestimonial
                                                        ].name
                                                    }
                                                </h3>
                                                <p className="text-[#284E4C] font-medium">
                                                    {
                                                        testimonials[
                                                            currentTestimonial
                                                        ].role
                                                    }
                                                </p>
                                                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {
                                                            testimonials[
                                                                currentTestimonial
                                                            ].location
                                                        }
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4" />
                                                        {
                                                            testimonials[
                                                                currentTestimonial
                                                            ].interests
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={nextTestimonial}
                                        className="p-2"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </div>

                                <blockquote className="text-lg text-gray-700 italic leading-relaxed text-center">
                                    "{testimonials[currentTestimonial].quote}"
                                </blockquote>

                                <div className="flex justify-center items-center gap-2 mt-8">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentTestimonial(index)
                                            }
                                            className={`w-3 h-3 rounded-full transition-colors ${
                                                index === currentTestimonial
                                                    ? "bg-[#284E4C]"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <FlexFooter />
        </div>
    );
}
