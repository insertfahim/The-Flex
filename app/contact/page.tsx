"use client";

import { FlexHeader } from "@/components/flex-header";
import { FlexFooter } from "@/components/flex-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Send,
    Users,
    Building,
    HelpCircle,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
    const [contactType, setContactType] = useState("");
    const [city, setCity] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log({
            contactType,
            city,
            firstName,
            lastName,
            email,
            phone,
            message,
        });
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
                            Get in Touch
                        </h1>
                        <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                            Contact The Flex for property listings, bookings, or
                            questions about our flexible rental services. Our
                            team is ready to help with customer inquiries,
                            landlord partnerships, and property management
                            services in London, Paris, and Algiers.
                        </p>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-4xl font-bold text-[#020817] mb-4">
                                        Get in Touch
                                    </h2>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Have a question about listing your
                                        property or booking a stay? Reach out
                                        and our team will guide you every step
                                        of the way.
                                    </p>
                                </div>

                                <Card className="shadow-lg">
                                    <CardContent className="p-8">
                                        <h3 className="text-2xl font-bold text-[#020817] mb-6">
                                            Please tell us a little about you
                                        </h3>
                                        <p className="text-gray-700 mb-6">
                                            Fill out the form below and we'll
                                            get back to you shortly.
                                        </p>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            {/* Contact Type */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="contact-type"
                                                    className="text-[#020817] font-medium"
                                                >
                                                    What would you like to
                                                    contact us about?
                                                </Label>
                                                <Select
                                                    value={contactType}
                                                    onValueChange={
                                                        setContactType
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="customer">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-4 w-4" />
                                                                I'm a Customer
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="landlord">
                                                            <div className="flex items-center gap-2">
                                                                <Building className="h-4 w-4" />
                                                                I'm a Landlord
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="other">
                                                            <div className="flex items-center gap-2">
                                                                <HelpCircle className="h-4 w-4" />
                                                                Something else
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* City Selection */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="city"
                                                    className="text-[#020817] font-medium"
                                                >
                                                    Select your city
                                                </Label>
                                                <Select
                                                    value={city}
                                                    onValueChange={setCity}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose a city" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="london">
                                                            🇬🇧 London
                                                        </SelectItem>
                                                        <SelectItem value="paris">
                                                            🇫🇷 Paris
                                                        </SelectItem>
                                                        <SelectItem value="algiers">
                                                            🇩🇿 Algiers
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Name Fields */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="first-name"
                                                        className="text-[#020817] font-medium"
                                                    >
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="first-name"
                                                        placeholder="John"
                                                        value={firstName}
                                                        onChange={(e) =>
                                                            setFirstName(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border-gray-200 focus:border-[#284E4C]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="last-name"
                                                        className="text-[#020817] font-medium"
                                                    >
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="last-name"
                                                        placeholder="Doe"
                                                        value={lastName}
                                                        onChange={(e) =>
                                                            setLastName(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border-gray-200 focus:border-[#284E4C]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-[#020817] font-medium"
                                                >
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="border-gray-200 focus:border-[#284E4C]"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="phone"
                                                    className="text-[#020817] font-medium"
                                                >
                                                    Phone Number
                                                </Label>
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
                                                        id="phone"
                                                        placeholder="Phone number"
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border-gray-200 focus:border-[#284E4C] rounded-l-none border-l-0"
                                                    />
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="message"
                                                    className="text-[#020817] font-medium"
                                                >
                                                    Message
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="How can we help you?"
                                                    value={message}
                                                    onChange={(e) =>
                                                        setMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={5}
                                                    className="border-gray-200 focus:border-[#284E4C]"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full bg-[#284E4C] hover:bg-[#1e3a38] text-white font-semibold py-3"
                                            >
                                                <Send className="h-5 w-5 mr-2" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <div className="relative mb-8">
                                    <Image
                                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"
                                        alt="Customer service team"
                                        width={800}
                                        height={600}
                                        className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                                    />
                                </div>

                                <div className="space-y-8">
                                    {/* Office Locations */}
                                    <Card className="shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <MapPin className="h-8 w-8 text-[#284E4C]" />
                                                <h3 className="text-2xl font-bold text-[#020817]">
                                                    Our Locations
                                                </h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇬🇧 London, UK
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Serving all of Greater
                                                        London and surrounding
                                                        areas
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇫🇷 Paris, France
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Covering Paris and
                                                        Île-de-France region
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇩🇿 Algiers, Algeria
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Operating throughout the
                                                        Algiers metropolitan
                                                        area
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Contact Numbers */}
                                    <Card className="shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Phone className="h-8 w-8 text-[#284E4C]" />
                                                <h3 className="text-2xl font-bold text-[#020817]">
                                                    Support Numbers
                                                </h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇬🇧 United Kingdom
                                                    </h4>
                                                    <p className="text-[#284E4C] font-semibold">
                                                        +44 77 2374 5646
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇩🇿 Algeria
                                                    </h4>
                                                    <p className="text-[#284E4C] font-semibold">
                                                        +33 7 57 59 22 41
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#020817] mb-1">
                                                        🇫🇷 France
                                                    </h4>
                                                    <p className="text-[#284E4C] font-semibold">
                                                        +33 6 44 64 57 17
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Email Contact */}
                                    <Card className="shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Mail className="h-8 w-8 text-[#284E4C]" />
                                                <h3 className="text-2xl font-bold text-[#020817]">
                                                    Email Us
                                                </h3>
                                            </div>
                                            <div>
                                                <p className="text-[#284E4C] font-semibold text-lg">
                                                    info@theflex.global
                                                </p>
                                                <p className="text-gray-700 text-sm mt-2">
                                                    We typically respond within
                                                    24 hours
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Business Hours */}
                                    <Card className="shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Clock className="h-8 w-8 text-[#284E4C]" />
                                                <h3 className="text-2xl font-bold text-[#020817]">
                                                    Business Hours
                                                </h3>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">
                                                        Monday - Friday
                                                    </span>
                                                    <span className="font-semibold text-[#020817]">
                                                        9:00 AM - 6:00 PM
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">
                                                        Saturday
                                                    </span>
                                                    <span className="font-semibold text-[#020817]">
                                                        10:00 AM - 4:00 PM
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">
                                                        Sunday
                                                    </span>
                                                    <span className="font-semibold text-[#020817]">
                                                        Closed
                                                    </span>
                                                </div>
                                                <div className="mt-4 p-3 bg-[#FFF9E9] rounded-lg">
                                                    <p className="text-sm text-[#020817]">
                                                        <strong>
                                                            Emergency Support:
                                                        </strong>{" "}
                                                        Available 24/7 for
                                                        urgent property issues
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-[#FFF9E9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#020817] mb-8">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Quick answers to common questions about The Flex
                                services
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="bg-white shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-[#020817] mb-4">
                                        How do I book a property?
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Browse our available properties online,
                                        select your dates, and complete the
                                        booking process. Our team will guide you
                                        through digital check-in and provide all
                                        necessary access information.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-[#020817] mb-4">
                                        What's included in the rent?
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        All properties come fully furnished with
                                        utilities, Wi-Fi, hotel-grade linens,
                                        and access to our 24/7 support team.
                                        Housekeeping services are available upon
                                        request.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-[#020817] mb-4">
                                        How can I list my property?
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Contact our landlord team for a free
                                        property assessment. We handle
                                        everything from improvements and
                                        marketing to guest management and
                                        maintenance, guaranteeing rent from day
                                        one.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-[#020817] mb-4">
                                        What are your cancellation policies?
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        We offer flexible cancellation policies
                                        depending on your booking type and
                                        length of stay. Contact our team for
                                        specific terms related to your
                                        reservation.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Live Chat CTA */}
                <section className="py-20 bg-gradient-to-br from-[#284E4C] to-[#1e3a38] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-8">
                                    Need Immediate Help?
                                </h2>
                                <p className="text-xl leading-relaxed mb-8">
                                    Our support team is available via WhatsApp
                                    for instant assistance. Get quick answers to
                                    your questions or connect with a specialist
                                    who can help with your specific needs.
                                </p>
                                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 text-lg">
                                    <MessageSquare className="h-5 w-5 mr-2" />
                                    Chat with us on WhatsApp
                                </Button>
                            </div>
                            <div className="relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                    alt="Customer support representative"
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
