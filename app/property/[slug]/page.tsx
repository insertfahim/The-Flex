"use client";

import { FlexHeader } from "@/components/flex-header";
import { PublicReviewsSection } from "@/components/public-reviews-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    MapPin,
    Wifi,
    Car,
    Coffee,
    Tv,
    Wind,
    Utensils,
    Bed,
    Bath,
    Users,
    Calendar,
    Star,
    Heart,
    Share2,
} from "lucide-react";
import { useState } from "react";

interface PropertyPageProps {
    params: {
        slug: string;
    };
}

export default function PropertyPage({ params }: PropertyPageProps) {
    const [isLiked, setIsLiked] = useState(false);

    // Mock property data - in a real app, this would be fetched based on the slug
    const property = {
        name: "2B N1 A - 29 Shoreditch Heights",
        location: "Shoreditch, London",
        price: "£120",
        rating: 4.8,
        reviewCount: 127,
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        images: [
            "/modern-apartment-bedroom-with-natural-light.jpg",
            "/stylish-living-room-with-contemporary-furniture.jpg",
            "/modern-kitchen-marble.png",
            "/elegant-bathroom-with-rainfall-shower.jpg",
        ],
        amenities: [
            { icon: Wifi, name: "Free WiFi" },
            { icon: Car, name: "Parking" },
            { icon: Coffee, name: "Coffee Machine" },
            { icon: Tv, name: "Smart TV" },
            { icon: Wind, name: "Air Conditioning" },
            { icon: Utensils, name: "Full Kitchen" },
        ],
        description:
            "Experience luxury living in the heart of Shoreditch with this beautifully designed 2-bedroom apartment. Featuring modern amenities, stylish furnishings, and floor-to-ceiling windows that flood the space with natural light. Perfect for business travelers, couples, or small families looking for a premium stay in one of London's most vibrant neighborhoods.",
        highlights: [
            "Prime Shoreditch location",
            "Modern design and furnishings",
            "Floor-to-ceiling windows",
            "Fully equipped kitchen",
            "High-speed WiFi",
            "24/7 guest support",
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <FlexHeader />

            <main>
                {/* Photo Gallery Section */}
                <section className="relative">
                    {/* All listings badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-red-500 text-white rounded-md px-3 py-1 text-sm font-medium">
                            All listings
                        </div>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-16 left-4 z-10">
                        <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                                {property.rating}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 h-80 lg:h-[400px]">
                        <div className="relative overflow-hidden">
                            <img
                                src={property.images[0] || "/placeholder.svg"}
                                alt={property.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {property.images.slice(1, 4).map((image, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden"
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`${property.name} - Image ${
                                            index + 2
                                        }`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                            <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center">
                                <Button
                                    variant="outline"
                                    className="bg-white/90 backdrop-blur-sm text-sm"
                                >
                                    + 16 photos
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Floating action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/90 backdrop-blur-sm"
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart
                                className={`h-4 w-4 ${
                                    isLiked ? "fill-red-500 text-red-500" : ""
                                }`}
                            />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/90 backdrop-blur-sm"
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </section>

                {/* Property Information Section */}
                <section className="bg-white py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="pb-6 border-b border-gray-200">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                {property.name}
                            </h1>
                            <div className="flex items-center gap-4 text-lg text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-5 w-5" />
                                    <span>{property.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-lg">
                                        {property.rating}
                                    </span>
                                    <span className="text-lg">
                                        ({property.reviewCount} reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Bed className="h-5 w-5" />
                                    <span className="text-lg">
                                        {property.bedrooms} bedrooms
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bath className="h-5 w-5" />
                                    <span className="text-lg">
                                        {property.bathrooms} bathroom
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-5 w-5" />
                                    <span className="text-lg">
                                        Up to {property.maxGuests} guests
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    About this space
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {property.description}
                                </p>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    What makes this place special
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {property.highlights.map(
                                        (highlight, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                                                <span className="text-gray-700">
                                                    {highlight}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Amenities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map(
                                        (amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
                                            >
                                                <amenity.icon className="h-5 w-5 text-gray-600" />
                                                <span className="text-gray-700">
                                                    {amenity.name}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-8 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-3xl font-bold text-gray-900">
                                            {property.price}
                                        </span>
                                        <span className="text-gray-600">
                                            per night
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="border border-gray-300 rounded-lg p-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                                    Check-in
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        Add date
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="border border-gray-300 rounded-lg p-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                                    Check-out
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        Add date
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-300 rounded-lg p-3">
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                                Guests
                                            </label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm">
                                                    1 guest
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold">
                                        Check availability
                                    </Button>

                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        You won't be charged yet
                                    </p>

                                    <div className="border-t pt-4 mt-6 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {property.price} × 5 nights
                                            </span>
                                            <span className="text-gray-900">
                                                £600
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                Cleaning fee
                                            </span>
                                            <span className="text-gray-900">
                                                £25
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                Service fee
                                            </span>
                                            <span className="text-gray-900">
                                                £15
                                            </span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>£640</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <PublicReviewsSection
                    propertyName={property.name}
                    maxReviews={9}
                />

                {/* Location Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Location
                        </h2>
                        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                            <p className="text-gray-600">
                                Interactive map would be displayed here
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                About the neighborhood
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Shoreditch is one of London's most vibrant and
                                creative neighborhoods, known for its street
                                art, trendy restaurants, and buzzing nightlife.
                                Located in the heart of East London, you'll be
                                within walking distance of Liverpool Street
                                Station, Brick Lane's famous curry houses, and
                                the trendy boutiques of Boxpark Shoreditch.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
