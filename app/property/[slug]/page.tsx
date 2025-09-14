"use client";

import { FlexHeader } from "@/components/flex-header";
import { PublicReviewsSection } from "@/components/public-reviews-section";
import { PropertiesMap } from "@/components/properties-map";
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
import { useState, useEffect } from "react";

interface PropertyPageProps {
    params: {
        slug: string;
    };
}

// Property data configuration with images and details
const propertyData: Record<string, any> = {
    "shoreditch-heights": {
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern apartment living room
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Kitchen
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bedroom
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bathroom
            "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Living area
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Dining area
            "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // View
        ],
        neighborhood:
            "Shoreditch is one of London's most vibrant and creative neighborhoods, known for its street art, trendy restaurants, and buzzing nightlife. Located in the heart of East London, you'll be within walking distance of Liverpool Street Station, Brick Lane's famous curry houses, and the trendy boutiques of Boxpark Shoreditch.",
    },
    "canary-wharf-tower": {
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern high-rise apartment
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Kitchen
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bedroom
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bathroom
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // City view
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Building exterior
        ],
        neighborhood:
            "Canary Wharf is London's premier financial district, featuring stunning skyscrapers, world-class shopping at Canary Wharf Mall, and excellent transport links. Perfect for business travelers, with easy access to the DLR, Jubilee Line, and Thames Clipper services.",
    },
    "fitzrovia-square": {
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Studio apartment
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Kitchen area
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bathroom
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Living space
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Street view
        ],
        neighborhood:
            "Fitzrovia is a charming neighborhood in Central London, known for its historic Georgian architecture, independent boutiques, and excellent dining scene. Located between Oxford Street and Regent's Park, it offers the perfect balance of central location and village-like atmosphere.",
    },
    "chelsea-garden-mews": {
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Luxury townhouse
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Kitchen
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Master bedroom
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Living room
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bathroom
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Garden
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Exterior
        ],
        neighborhood:
            "Chelsea is one of London's most prestigious neighborhoods, famous for the King's Road, Chelsea Physic Garden, and its proximity to Hyde Park. This affluent area offers world-class shopping, fine dining, and beautiful Victorian architecture.",
    },
    "paddington-central": {
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern apartment
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Kitchen
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bedroom
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Living room
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bathroom
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Building view
        ],
        neighborhood:
            "Paddington is a major transport hub with excellent connections across London and beyond. The area features beautiful Victorian squares, Hyde Park nearby, and the famous Paddington Station with direct links to Heathrow Airport.",
    },
};

export default function PropertyPage({ params }: PropertyPageProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPropertyData();
    }, [params.slug]);

    const fetchPropertyData = async () => {
        try {
            const response = await fetch(`/api/properties/${params.slug}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const propertyInfo = data.data;
                    const configData =
                        propertyData[params.slug] ||
                        propertyData["shoreditch-heights"];

                    setProperty({
                        ...propertyInfo,
                        images: configData.images,
                        neighborhood: configData.neighborhood,
                        amenities: [
                            { icon: Wifi, name: "Free WiFi" },
                            { icon: Car, name: "Parking" },
                            { icon: Coffee, name: "Coffee Machine" },
                            { icon: Tv, name: "Smart TV" },
                            { icon: Wind, name: "Air Conditioning" },
                            { icon: Utensils, name: "Full Kitchen" },
                        ],
                        highlights: generateHighlights(propertyInfo),
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching property:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateHighlights = (propertyInfo: any) => {
        const highlights = [
            `Prime ${propertyInfo.location} location`,
            "Modern design and furnishings",
            "High-speed WiFi",
            "24/7 guest support",
        ];

        if (propertyInfo.bedrooms > 0) {
            highlights.push("Comfortable bedrooms");
        }
        if (propertyInfo.bathrooms > 1) {
            highlights.push("Multiple bathrooms");
        }
        if (propertyInfo.maxGuests >= 4) {
            highlights.push("Perfect for families");
        }

        return highlights;
    };

    const openImageModal = (imageUrl: string, index: number) => {
        setSelectedImage(imageUrl);
        setSelectedImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (!property) return;
        const nextIndex = (selectedImageIndex + 1) % property.images.length;
        setSelectedImageIndex(nextIndex);
        setSelectedImage(property.images[nextIndex]);
    };

    const prevImage = () => {
        if (!property) return;
        const prevIndex =
            selectedImageIndex === 0
                ? property.images.length - 1
                : selectedImageIndex - 1;
        setSelectedImageIndex(prevIndex);
        setSelectedImage(property.images[prevIndex]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <FlexHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            Loading property...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-white">
                <FlexHeader />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Property not found
                        </h1>
                        <p className="text-gray-600">
                            The property you're looking for doesn't exist.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <FlexHeader />

            <main className="pt-0">
                {/* Photo Gallery Section */}
                <section className="py-8 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative rounded-xl overflow-hidden">
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

                            {/* Fixed height container for images */}
                            <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">
                                    <div
                                        className="relative overflow-hidden h-full cursor-pointer group"
                                        onClick={() =>
                                            openImageModal(
                                                property.images[0],
                                                0
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                property.images[0] ||
                                                "/placeholder.svg"
                                            }
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 h-full">
                                        {property.images
                                            .slice(1, 4)
                                            .map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="relative overflow-hidden h-full cursor-pointer group"
                                                    onClick={() =>
                                                        openImageModal(
                                                            image,
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            image ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={`${
                                                            property.name
                                                        } - Image ${index + 2}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                                </div>
                                            ))}
                                        <div
                                            className="relative overflow-hidden h-full cursor-pointer group"
                                            onClick={() =>
                                                openImageModal(
                                                    property.images[0],
                                                    0
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    property.images[4] ||
                                                    "/placeholder.svg"
                                                }
                                                alt={`${property.name} - Image 5`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                            {/* Overlay with photo count */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                                                    <span className="text-gray-900 font-semibold text-sm">
                                                        +{" "}
                                                        {property.images
                                                            .length - 4}{" "}
                                                        more photos
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating action buttons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm hover:bg-white hover:text-gray-900"
                                    onClick={() => setIsLiked(!isLiked)}
                                >
                                    <Heart
                                        className={`h-4 w-4 ${
                                            isLiked
                                                ? "fill-red-500 text-red-500"
                                                : "text-gray-700"
                                        }`}
                                    />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm hover:bg-white hover:text-gray-900"
                                >
                                    <Share2 className="h-4 w-4 text-gray-700" />
                                </Button>
                            </div>
                        </div>
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
                        {property && (
                            <PropertiesMap
                                properties={[property]}
                                className="border border-gray-200"
                                height="400px"
                                showControls={true}
                                zoom={15}
                            />
                        )}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                About the neighborhood
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {property.neighborhood}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
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

                        {/* Previous button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Next button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        {/* Image */}
                        <img
                            src={selectedImage}
                            alt={`${property.name} - Full size`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                        />

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                            {selectedImageIndex + 1} / {property.images.length}
                        </div>
                    </div>

                    {/* Click outside to close */}
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={closeImageModal}
                    ></div>
                </div>
            )}
        </div>
    );
}
