"use client";

import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Star,
    ChevronLeft,
    ChevronRight,
    Rocket,
    Users,
    Heart,
    Target,
    CheckCircle,
    XCircle,
    ArrowRight,
    Briefcase,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function CareersPage() {
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
                            Join Our Team
                        </h1>
                        <p className="text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed mb-8">
                            Join our mission to turn flexible living into the
                            new global standard - unlocking freedom for renters,
                            efficiency for landlords, and growth for entire
                            cities. Browse our open roles to join a remote-first
                            crew of A-players who own big problems, ship fast,
                            and learn faster.
                        </p>
                        <Button className="bg-white text-[#284E4C] hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                            <Briefcase className="h-5 w-5 mr-2" />
                            Browse Open Positions
                        </Button>
                    </div>
                </section>

                {/* Why Work With Us */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Why work with us?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Culture */}
                            <Card className="bg-[#FFF9E9] shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                        alt="Team collaboration and culture"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Users className="h-8 w-8 text-[#284E4C]" />
                                        <h3 className="text-2xl font-bold text-[#020817]">
                                            Culture
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        An ego-free, fast-paced, values-driven
                                        environment that champions big ideas and
                                        learning from failure. With no hierarchy
                                        or bureaucracy, the best idea in the
                                        room always wins—and we ship it fast.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Career Rocket Ship */}
                            <Card className="bg-[#FFF9E9] shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop"
                                        alt="Career growth and development"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Rocket className="h-8 w-8 text-[#284E4C]" />
                                        <h3 className="text-2xl font-bold text-[#020817]">
                                            Career Rocket Ship
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Own mission-critical projects from day
                                        one and see your impact land. Promotions
                                        come from performance, not tenure and we
                                        grow and select our leaders from the
                                        inside - not from external hires.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* True Freedom */}
                            <Card className="bg-[#FFF9E9] shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop"
                                        alt="Remote work freedom and flexibility"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Heart className="h-8 w-8 text-[#284E4C]" />
                                        <h3 className="text-2xl font-bold text-[#020817]">
                                            True Freedom
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        A setup as fluid as our product: we hire
                                        stellar talent, trust them to own
                                        outcomes, and let them live and work
                                        however they choose. Minimal rules,
                                        total accountability, genuine freedom.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Mentorship */}
                            <Card className="bg-[#FFF9E9] shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 mb-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop"
                                        alt="Mentorship and guidance"
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Target className="h-8 w-8 text-[#284E4C]" />
                                        <h3 className="text-2xl font-bold text-[#020817]">
                                            Mentorship
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Work alongside senior leaders who share
                                        playbooks, turn failures into fuel, and
                                        celebrate wins. Count on direct
                                        feedback, hands-on coaching, and mentors
                                        who turn potential into expertise.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Founder Quotes */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Raouf Quote */}
                            <Card className="bg-white shadow-lg p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                                            alt="Raouf Yousfi"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#020817]">
                                            Raouf Yousfi
                                        </h3>
                                        <p className="text-[#284E4C] font-medium">
                                            Co-Founder & CEO
                                        </p>
                                    </div>
                                </div>
                                <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                                    "Accountability is everything: own a metric,
                                    own the decision, own the win. Rapid growth
                                    requires boldness, and we have it in
                                    spades."
                                </blockquote>
                            </Card>

                            {/* Michael Quote */}
                            <Card className="bg-white shadow-lg p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
                                            alt="Michael Buggy"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#020817]">
                                            Michael Buggy
                                        </h3>
                                        <p className="text-[#284E4C] font-medium">
                                            Co-Founder & COO
                                        </p>
                                    </div>
                                </div>
                                <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                                    "Big ideas beat big egos. At The Flex, the
                                    best argument backed by data wins every
                                    single time, whether it comes from an intern
                                    or the CEO."
                                </blockquote>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Our Values
                            </h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Three core values run through the veins of every
                                team member and anchor the decisions we make...
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#284E4C] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#020817] mb-4">
                                    Integrity
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Lasting success is impossible without trust.
                                    We lead with radical honesty—sharing data,
                                    intentions, and feedback in plain sight—so
                                    clients, partners, and teammates always know
                                    where we stand.
                                </p>
                            </Card>

                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Rocket className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#020817] mb-4">
                                    Innovation
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We believe in a data-backed approach, where
                                    our chosen path is based on evidence. We
                                    treasure the open-minded with a diverse and
                                    dynamic team that lead us to the ultimate
                                    solutions.
                                </p>
                            </Card>

                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#020817] mb-4">
                                    Accountability
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    With no hierarchy, ownership fuels our flat
                                    structure. Each teammate holds clear metrics
                                    and turns objectives into outcomes that
                                    translates to success for the whole company.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                    Our Vision
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    The Flex will be a global leader in flexible
                                    living, with homes available in every major
                                    city worldwide. This ecosystem will unlock
                                    true mobility for renters, deliver higher
                                    returns with radical transparency for
                                    landlords, and empower our people to reshape
                                    how the world lives.
                                </p>
                            </div>
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                                    alt="Global vision and expansion"
                                    width={800}
                                    height={600}
                                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                                />
                            </div>
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

                {/* Don't Apply If */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Don't apply if...
                            </h2>
                            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                We receive a huge volume of applicants and look
                                for people who thrive on ambition,
                                resourcefulness, and going the extra mile - if
                                any of the following sound like you, we won't be
                                the right fit.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                "You're looking for a 9 to 5 job with no growth",
                                "You're not ambitious",
                                "You're not going above and beyond",
                                "You're not resourceful",
                                "You're not hard working",
                            ].map((item, index) => (
                                <Card
                                    key={index}
                                    className="p-6 bg-white shadow-lg border-l-4 border-red-500"
                                >
                                    <div className="flex items-center gap-3">
                                        <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                                        <p className="text-gray-700 font-medium">
                                            {item}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Application Process */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Application Process
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#284E4C] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">
                                        1
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#020817] mb-4">
                                    Application
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Apply directly on this website via our jobs
                                    page.
                                </p>
                            </Card>

                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">
                                        2
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#020817] mb-4">
                                    Assessment Task
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Complete an online assessment tailored to
                                    the job role.
                                </p>
                            </Card>

                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">
                                        3
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#020817] mb-4">
                                    HR Interview
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Online interview with the hiring manager to
                                    explore mutual fit.
                                </p>
                            </Card>

                            <Card className="text-center p-8 bg-[#FFF9E9] shadow-lg">
                                <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">
                                        4
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#020817] mb-4">
                                    Founder Interview
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Every application involves an interview with
                                    one of our founders.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-[#284E4C] to-[#1e3a38] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-8">
                                    Are you one of us?
                                </h2>
                                <p className="text-xl leading-relaxed mb-8">
                                    If you like what you're hearing and are
                                    interested in working at The Flex, browse
                                    our open positions or fill out an open
                                    application. We can't wait to hear from you.
                                </p>
                                <Button className="bg-white text-[#284E4C] hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                                    <Briefcase className="h-5 w-5 mr-2" />
                                    Browse Open Positions
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </div>
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop"
                                    alt="Woman working on laptop"
                                    width={800}
                                    height={600}
                                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FlexFooter />
        </div>
    );
}
