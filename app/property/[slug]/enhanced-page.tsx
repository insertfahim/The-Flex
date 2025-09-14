"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Star,
    MapPin,
    Users,
    Bed,
    Bath,
    Wifi,
    Car,
    Coffee,
    Tv,
    Wind,
    Utensils,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Expand,
    Calendar,
    MessageCircle,
    Shield,
    Clock,
    Ban,
    PawPrint,
    PartyPopper,
    CalendarClock,
    Thermometer,
    ShieldCheck,
    Network,
    WashingMachine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PropertyPageProps {
    params: {
        slug: string;
    };
}

// Enhanced property data with all the details from the HTML
const propertyData: Record<string, any> = {
    "chiswick-park-flat": {
        id: 239686,
        monthPrice: 6450,
        calculatedPrice: 215,
        description: `This apartment in Chiswick is the perfect spot for up to 5 guests. I've made sure each of the 2 bedrooms is comfortable, with a double bed in each, ideal for two people. In the living room, there's an extra single bed for one more guest. The apartment also features 1 bathroom and a fully equipped kitchen, perfect for cooking your meals. With a cozy atmosphere, stylish furnishings, and a great location, I'm sure you'll feel right at home while you explore Chiswick and beyond.

I'm thrilled to offer this cozy and well-equipped apartment, perfect for up to 5 guests. The apartment has 2 comfortable bedrooms, each with a double bed, ideal for two people. In the living room, you'll find an extra single bed for one more guest. The apartment features 1 modern bathroom and a fully equipped kitchen with top-notch appliances, perfect for preparing meals during your stay.

For your convenience, there are multiple storage spaces for your luggage and belongings. Wi-Fi is fully installed throughout the apartment, so you can stay connected. I've also ensured all bed linen is 100% cotton, and the duvets and pillows are hypoallergenic for a peaceful night's sleep. The apartment is thoughtfully decorated to create a welcoming atmosphere, making it the perfect place to relax after exploring the area.`,
        monthlyDiscount: 0.8,
        currency: "GBP",
        lat: 51.4879331,
        lng: -0.260155,
        cleaningFee: 100,
        minStay: 14,
        amenities: [
            { amenityId: 1, amenityName: "Cable TV" },
            { amenityId: 2, amenityName: "Internet" },
            { amenityId: 3, amenityName: "Wireless" },
            { amenityId: 7, amenityName: "Kitchen" },
            { amenityId: 13, amenityName: "Washing Machine" },
            { amenityId: 17, amenityName: "Hair Dryer" },
            { amenityId: 18, amenityName: "Heating" },
            { amenityId: 25, amenityName: "Smoke detector" },
            { amenityId: 26, amenityName: "Carbon Monoxide Detector" },
            { amenityId: 29, amenityName: "Essentials" },
            { amenityId: 30, amenityName: "Shampoo" },
            { amenityId: 31, amenityName: "Hangers" },
            { amenityId: 32, amenityName: "Iron" },
            { amenityId: 34, amenityName: "TV" },
            { amenityId: 47, amenityName: "Private living room" },
            { amenityId: 48, amenityName: "Suitable for children" },
            { amenityId: 49, amenityName: "Suitable for infants" },
            { amenityId: 53, amenityName: "Iron board" },
            { amenityId: 54, amenityName: "Linens" },
            { amenityId: 56, amenityName: "Toaster" },
            { amenityId: 57, amenityName: "Dishwasher" },
            { amenityId: 58, amenityName: "Microwave" },
            { amenityId: 59, amenityName: "Oven" },
            { amenityId: 60, amenityName: "Electric kettle" },
            { amenityId: 62, amenityName: "Shower" },
            { amenityId: 63, amenityName: "Tub" },
            { amenityId: 68, amenityName: "Stove" },
            { amenityId: 69, amenityName: "Refrigerator" },
            { amenityId: 70, amenityName: "Towels" },
            { amenityId: 74, amenityName: "Kitchen utensils" },
            { amenityId: 101, amenityName: "Hot water" },
            { amenityId: 129, amenityName: "Toilet" },
            { amenityId: 149, amenityName: "Dining area" },
            { amenityId: 202, amenityName: "Long term stays allowed" },
            { amenityId: 267, amenityName: "Enhanced Cleaning Practices" },
            { amenityId: 272, amenityName: "Contactless Check-In/Out" },
            { amenityId: 280, amenityName: "Free WiFi" },
            { amenityId: 282, amenityName: "WiFi speed (25+ Mbps)" },
            { amenityId: 287, amenityName: "Smart TV" },
            { amenityId: 294, amenityName: "Dining table" },
            { amenityId: 337, amenityName: "Cleaning products" },
            { amenityId: 338, amenityName: "Body soap" },
            { amenityId: 339, amenityName: "Conditioner" },
            { amenityId: 341, amenityName: "Shower gel" },
            { amenityId: 342, amenityName: "Clothing storage" },
            { amenityId: 343, amenityName: "Drying rack for clothing" },
            { amenityId: 351, amenityName: "Portable fans" },
            { amenityId: 357, amenityName: "Freezer" },
            { amenityId: 361, amenityName: "Wine glasses" },
        ],
        personCapacity: 5,
        guestsAllowed: 5,
        totalBedrooms: 2,
        totalBeds: 3,
        totalBathrooms: 1,
        listingName: "Stunning 2 Bed Flat near Chiswick Park",
        listingUnits: 1,
        city: "London",
        images: [
            {
                imageId: 305741011,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-vSshtj4kthrc5t5McAEQ8FdVRwBccjlyX8Ld8tGz7zA-65c414b9d2721",
            },
            {
                imageId: 305741012,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-AuErzjkPylT8SQ4DWlkvwcdaaKR5PtVWuqIBGCMKNiM-65c414b7f41ed",
            },
            {
                imageId: 305741013,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-nzUQfscC-MK9QUEP8s1tgAIoxU96NNzHSSkLAxzcLys-65c414b7094df",
            },
            {
                imageId: 305741014,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-kcVQT9ZE4iiK12SzTLOenPz4l7Nh3PqppOHFutKIMuA-65c414b5da1f1",
            },
            {
                imageId: 305741016,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-mNSCp0xHH6vK9cXViuc3wTdfn09sV45n5MFFCmbSt-A-65c414b49134e",
            },
            {
                imageId: 305741017,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-R07Qslgt-JJn3hRX6zTThTGKp30vWRnyJK9O06R4TqY-65c414b32072b",
            },
            {
                imageId: 305741020,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-JDFGupO82E7iTQ3JOgod5ma93meQLh0b6t7V44jM1-E-65c40539d90ab",
            },
            {
                imageId: 305741018,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-Ce9Qy3--QU2kWQ4wSoRpi48vjzj0BXirIaM8JpSKlc6k-65c414b1b7270",
            },
            {
                imageId: 305741021,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-t5cB3aU7JGWLFhJLEUPD4DO--ZAFr--t-IVWLv4BkdDF4-65c414b008404",
            },
            {
                imageId: 305741019,
                url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-239686-f--juzEmFQQy0RAHFKRA1N0kepOKfiSeVPLx9enAOs1I-65c4053b42b9c",
            },
        ],
    },
};

export default function PropertyPage({ params }: PropertyPageProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(1);

    useEffect(() => {
        // For demo purposes, use the static data
        const propertyInfo = propertyData["chiswick-park-flat"];
        setProperty(propertyInfo);
        setLoading(false);
    }, [params.slug]);

    const nextImage = () => {
        if (property?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = () => {
        if (property?.images) {
            setCurrentImageIndex(
                (prev) =>
                    (prev - 1 + property.images.length) % property.images.length
            );
        }
    };

    const openImageModal = (imageUrl: string, index: number) => {
        setSelectedImage(imageUrl);
        setSelectedImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const getAmenityIcon = (amenityName: string) => {
        const name = amenityName.toLowerCase();
        if (name.includes("tv") || name.includes("cable")) return Tv;
        if (
            name.includes("wifi") ||
            name.includes("wireless") ||
            name.includes("internet")
        )
            return Wifi;
        if (name.includes("kitchen") || name.includes("cooking"))
            return Utensils;
        if (name.includes("washing")) return WashingMachine;
        if (name.includes("heating") || name.includes("temperature"))
            return Thermometer;
        if (
            name.includes("detector") ||
            name.includes("smoke") ||
            name.includes("safety")
        )
            return ShieldCheck;
        if (name.includes("parking") || name.includes("car")) return Car;
        if (name.includes("coffee")) return Coffee;
        if (name.includes("air")) return Wind;
        return Network; // Default icon
    };

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: "#FFFDF6" }}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#284E4C] mx-auto mb-4"></div>
                    <p className="text-[#5C5C5A]">
                        Loading property details...
                    </p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: "#FFFDF6" }}
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#333333] mb-2">
                        Property not found
                    </h1>
                    <p className="text-[#5C5C5A] mb-4">
                        The property you're looking for doesn't exist.
                    </p>
                    <Link href="/properties">
                        <Button className="bg-[#284E4C] hover:bg-[#284E4C]/90 text-white">
                            View All Properties
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#FFFDF6" }}
        >
            {/* Header spacing */}
            <div style={{ paddingTop: "88px" }} />

            <main className="flex-grow">
                <div
                    className="container mx-auto max-w-7xl px-3 md:px-4"
                    style={{ backgroundColor: "#FFFDF6" }}
                >
                    {/* Back button for mobile */}
                    <div className="py-2 md:py-4">
                        <div className="flex items-center text-sm text-[#5C5C5A] mb-4 md:hidden">
                            <Link
                                href="/properties"
                                className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-md text-xs p-0 h-auto text-[#5C5C5A] hover:text-[#333333]"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Back
                            </Link>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="relative mb-8 md:mb-12">
                        {/* Mobile carousel */}
                        <div className="md:hidden">
                            <div className="relative">
                                <div className="relative w-full">
                                    <div className="overflow-hidden">
                                        <div
                                            className="flex -ml-4"
                                            style={{
                                                transform: `translate3d(-${
                                                    currentImageIndex * 100
                                                }%, 0px, 0px)`,
                                            }}
                                        >
                                            {property.images.map(
                                                (image: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                                                    >
                                                        <div
                                                            className="relative w-full"
                                                            style={{
                                                                paddingBottom:
                                                                    "75%",
                                                            }}
                                                        >
                                                            <div className="rounded-2xl overflow-hidden absolute inset-0">
                                                                <Image
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    alt={`${
                                                                        property.listingName
                                                                    } - Image ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Navigation arrows */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute h-8 w-8 rounded-full p-0 top-1/2 -translate-y-1/2 left-4 bg-white/90 hover:bg-white border-0 shadow-lg flex items-center justify-center"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute h-8 w-8 rounded-full p-0 top-1/2 -translate-y-1/2 right-4 bg-white/90 hover:bg-white border-0 shadow-lg flex items-center justify-center"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* View all button */}
                                <button className="absolute bottom-4 left-4 bg-white/90 hover:bg-white border-0 shadow-lg backdrop-blur-sm h-8 rounded-md px-3 text-xs flex items-center">
                                    <Expand className="h-4 w-4 mr-2" />
                                    View all
                                </button>

                                {/* Image counter */}
                                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {currentImageIndex + 1} /{" "}
                                    {property.images.length}
                                </div>
                            </div>
                        </div>

                        {/* Desktop grid */}
                        <div className="hidden md:block">
                            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                                <div className="col-span-2 row-span-2 relative cursor-pointer group">
                                    <Image
                                        src={property.images[0]?.url}
                                        alt={`${property.listingName} - Main`}
                                        fill
                                        className="object-cover rounded-l-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 rounded-l-xl" />
                                </div>
                                {property.images
                                    .slice(1, 5)
                                    .map((image: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`relative cursor-pointer group ${
                                                index === 1
                                                    ? "rounded-tr-xl"
                                                    : index === 3
                                                    ? "rounded-br-xl"
                                                    : ""
                                            }`}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={`${
                                                    property.listingName
                                                } - Image ${index + 2}`}
                                                fill
                                                className={`object-cover ${
                                                    index === 1
                                                        ? "rounded-tr-xl"
                                                        : index === 3
                                                        ? "rounded-br-xl"
                                                        : ""
                                                }`}
                                            />
                                            <div
                                                className={`absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 ${
                                                    index === 1
                                                        ? "rounded-tr-xl"
                                                        : index === 3
                                                        ? "rounded-br-xl"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    ))}
                                <button className="absolute bottom-6 right-6 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-sm font-medium">
                                    <Expand className="h-4 w-4" />
                                    View all photos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Property Info */}
                    <div className="mb-8 md:mb-12">
                        {/* Mobile layout */}
                        <div className="md:hidden space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold text-[#333333] leading-tight mb-2">
                                        {property.listingName}
                                    </h1>
                                </div>
                            </div>

                            {/* Property details grid */}
                            <div
                                className="grid grid-cols-2 gap-4 rounded-2xl p-4"
                                style={{ backgroundColor: "#FFFDF6" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl shadow-sm">
                                        <Users className="h-5 w-5 text-[#284E4C]" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#333333] block">
                                            {property.personCapacity}
                                        </span>
                                        <span className="text-sm text-[#5C5C5A]">
                                            Guests
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl shadow-sm">
                                        <Bed className="h-5 w-5 text-[#284E4C]" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#333333] block">
                                            {property.totalBedrooms}
                                        </span>
                                        <span className="text-sm text-[#5C5C5A]">
                                            Bedrooms
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl shadow-sm">
                                        <Bath className="h-5 w-5 text-[#284E4C]" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#333333] block">
                                            {property.totalBathrooms}
                                        </span>
                                        <span className="text-sm text-[#5C5C5A]">
                                            Bathrooms
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl shadow-sm">
                                        <Bed className="h-5 w-5 text-[#284E4C]" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#333333] block">
                                            {property.totalBeds}
                                        </span>
                                        <span className="text-sm text-[#5C5C5A]">
                                            beds
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop layout */}
                        <div className="hidden md:block">
                            <h1 className="text-3xl font-bold mb-6 text-[#333333]">
                                {property.listingName}
                            </h1>
                            <div className="flex items-center gap-8 border-b border-gray-200 pb-8">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full">
                                        <Users className="h-5 w-5 text-[#5C5C5A]" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-[#333333]">
                                            {property.personCapacity}
                                        </span>
                                        <span className="text-[#5C5C5A] block">
                                            Guests
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full">
                                        <Bed className="h-5 w-5 text-[#5C5C5A]" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-[#333333]">
                                            {property.totalBedrooms}
                                        </span>
                                        <span className="text-[#5C5C5A] block">
                                            Bedrooms
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full">
                                        <Bath className="h-5 w-5 text-[#5C5C5A]" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-[#333333]">
                                            {property.totalBathrooms}
                                        </span>
                                        <span className="text-[#5C5C5A] block">
                                            Bathrooms
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full">
                                        <Bed className="h-5 w-5 text-[#5C5C5A]" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium text-[#333333]">
                                            {property.totalBeds}
                                        </span>
                                        <span className="text-[#5C5C5A] block">
                                            beds
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 mb-20 md:mb-8">
                        <div className="lg:col-span-2">
                            {/* About Section */}
                            <Card className="mb-8 p-6 bg-white border-0 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
                                    About this property
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-[#5C5C5A] whitespace-pre-line leading-relaxed">
                                        {showFullDescription
                                            ? property.description
                                            : `${property.description.substring(
                                                  0,
                                                  200
                                              )}...`}
                                        <button
                                            onClick={() =>
                                                setShowFullDescription(
                                                    !showFullDescription
                                                )
                                            }
                                            className="text-[#284E4C] hover:text-[#284E4C]/90 p-0 h-auto inline ml-2 underline"
                                        >
                                            {showFullDescription
                                                ? "Show less"
                                                : "Read more"}
                                        </button>
                                    </p>
                                </div>
                            </Card>

                            {/* Amenities Section */}
                            <Card className="p-6 mb-12 bg-white border-0 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold text-[#333333]">
                                        Amenities
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setShowAllAmenities(
                                                !showAllAmenities
                                            )
                                        }
                                        className="flex items-center gap-2 border bg-background shadow-sm h-9 px-4 py-2 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 rounded-md"
                                    >
                                        {showAllAmenities
                                            ? "Show less"
                                            : "View all amenities"}
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {(showAllAmenities
                                        ? property.amenities
                                        : property.amenities.slice(0, 9)
                                    ).map((amenity: any, index: number) => {
                                        const IconComponent = getAmenityIcon(
                                            amenity.amenityName
                                        );
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 text-[#5C5C5A]"
                                            >
                                                <div className="p-2 rounded-full">
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <span className="capitalize">
                                                    {amenity.amenityName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>

                            {/* Stay Policies */}
                            <Card className="p-6 mb-8 bg-white border-0 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-6 text-[#333333]">
                                    Stay Policies
                                </h2>
                                <div className="space-y-8">
                                    {/* Check-in & Check-out */}
                                    <div className="bg-[#F1F3EE] rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-full">
                                                <Clock className="h-5 w-5 text-[#284E4C]" />
                                            </div>
                                            <h3 className="font-semibold text-lg text-[#333333]">
                                                Check-in & Check-out
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white rounded-lg p-4">
                                                <p className="text-sm text-[#5C5C5A]">
                                                    Check-in Time
                                                </p>
                                                <p className="font-semibold text-lg text-[#333333]">
                                                    3:00 PM
                                                </p>
                                            </div>
                                            <div className="bg-white rounded-lg p-4">
                                                <p className="text-sm text-[#5C5C5A]">
                                                    Check-out Time
                                                </p>
                                                <p className="font-semibold text-lg text-[#333333]">
                                                    10:00 AM
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* House Rules */}
                                    <div className="bg-[#F1F3EE] rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-full">
                                                <Shield className="h-5 w-5 text-[#284E4C]" />
                                            </div>
                                            <h3 className="font-semibold text-lg text-[#333333]">
                                                House Rules
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                                                <Ban className="h-5 w-5 text-[#5C5C5A]" />
                                                <p className="font-medium text-[#333333]">
                                                    No smoking
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                                                <PawPrint className="h-5 w-5 text-[#5C5C5A]" />
                                                <p className="font-medium text-[#333333]">
                                                    No pets
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                                                <PartyPopper className="h-5 w-5 text-[#5C5C5A]" />
                                                <p className="font-medium text-[#333333]">
                                                    No parties or events
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                                                <Shield className="h-5 w-5 text-[#5C5C5A]" />
                                                <p className="font-medium text-[#333333]">
                                                    Security deposit required
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cancellation Policy */}
                                    <div className="bg-[#F1F3EE] rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-full">
                                                <CalendarClock className="h-5 w-5 text-[#284E4C]" />
                                            </div>
                                            <h3 className="font-semibold text-lg text-[#333333]">
                                                Cancellation Policy
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white rounded-lg p-4">
                                                <h4 className="font-medium mb-2 text-[#333333]">
                                                    For stays less than 28 days
                                                </h4>
                                                <div className="flex items-start gap-2 text-sm text-[#5C5C5A]">
                                                    <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0" />
                                                    <p>
                                                        Full refund up to 14
                                                        days before check-in
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-[#5C5C5A] mt-1">
                                                    <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0" />
                                                    <p>
                                                        No refund for bookings
                                                        less than 14 days before
                                                        check-in
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4">
                                                <h4 className="font-medium mb-2 text-[#333333]">
                                                    For stays of 28 days or more
                                                </h4>
                                                <div className="flex items-start gap-2 text-sm text-[#5C5C5A]">
                                                    <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0" />
                                                    <p>
                                                        Full refund up to 30
                                                        days before check-in
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-[#5C5C5A] mt-1">
                                                    <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0" />
                                                    <p>
                                                        No refund for bookings
                                                        less than 30 days before
                                                        check-in
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Location */}
                            <Card className="p-6 mb-8 bg-white border-0 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-6 text-[#333333]">
                                    Location
                                </h2>
                                <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="h-12 w-12 text-[#284E4C] mx-auto mb-2" />
                                        <p className="text-[#5C5C5A]">
                                            Interactive map would be displayed
                                            here
                                        </p>
                                        <p className="text-sm text-[#5C5C5A] mt-1">
                                            Chiswick, London
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8 text-left mt-6">
                                    <span className="text-[#284E4C]">
                                        Browse more{" "}
                                        <Link
                                            href="/properties"
                                            className="text-[#284E4C] hover:text-[#284E4C]/80 transition-colors underline underline-offset-2"
                                        >
                                            monthly apartment rentals in London
                                        </Link>
                                    </span>
                                </div>
                            </Card>
                        </div>

                        {/* Booking Widget */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 overflow-hidden bg-white border-0 shadow-lg rounded-2xl">
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#284E4C]" />
                                    <div className="relative p-6">
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            Book Your Stay
                                        </h3>
                                        <p className="text-sm text-[#D2DADA]">
                                            Select dates to see prices
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 pt-4">
                                    <div className="space-y-1">
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <button className="w-full h-[42px] justify-start text-left bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] rounded-l-md rounded-r-none px-4 py-2 flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    <span>Select dates</span>
                                                </button>
                                            </div>
                                            <div className="w-[120px]">
                                                <Select
                                                    value={selectedGuests.toString()}
                                                    onValueChange={(value) =>
                                                        setSelectedGuests(
                                                            parseInt(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="h-[42px] bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] text-[#333333] rounded-l-none rounded-r-md">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                            <span>
                                                                {selectedGuests}
                                                            </span>
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from(
                                                            {
                                                                length: property.personCapacity,
                                                            },
                                                            (_, i) => (
                                                                <SelectItem
                                                                    key={i + 1}
                                                                    value={(
                                                                        i + 1
                                                                    ).toString()}
                                                                >
                                                                    {i + 1}{" "}
                                                                    Guest
                                                                    {i > 0
                                                                        ? "s"
                                                                        : ""}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pt-6">
                                        <Button
                                            disabled
                                            className="w-full bg-[#284E4C] hover:bg-[#284E4C]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12"
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Check availability
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30 h-12"
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Send Inquiry
                                        </Button>
                                    </div>
                                    <p className="text-sm text-[#5C5C5A] text-center mt-4">
                                        <span className="inline-flex items-center gap-1">
                                            <Shield className="h-3 w-3" />
                                            Instant booking confirmation
                                        </span>
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
