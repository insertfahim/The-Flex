import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const properties = [
    {
        name: "2B N1 A - 29 Shoreditch Heights",
        slug: "shoreditch-heights",
        location: "Shoreditch, London",
        description:
            "Experience luxury living in the heart of Shoreditch with this beautifully designed 2-bedroom apartment. Featuring modern amenities, stylish furnishings, and floor-to-ceiling windows that flood the space with natural light.",
        images: [
            "/modern-apartment-bedroom-with-natural-light.jpg",
            "/stylish-living-room-with-contemporary-furniture.jpg",
            "/modern-kitchen-marble.png",
            "/elegant-bathroom-with-rainfall-shower.jpg",
        ],
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        pricePerNight: 12000, // £120 in pence
    },
    {
        name: "1B E1 B - 15 Canary Wharf Tower",
        slug: "canary-wharf-tower",
        location: "Canary Wharf, London",
        description:
            "Modern 1-bedroom apartment in the heart of London's financial district. Perfect for business travelers with stunning city views and premium amenities.",
        images: [
            "/luxury-canary-wharf-apartment.jpg",
            "/modern-furnished-apartment-living-room.jpg",
            "/elegant-bathroom-with-rainfall-shower.jpg",
        ],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        pricePerNight: 15000, // £150 in pence
    },
    {
        name: "Studio W1 C - 42 Fitzrovia Square",
        slug: "fitzrovia-square",
        location: "Fitzrovia, London",
        description:
            "Stylish studio apartment in trendy Fitzrovia. Compact yet comfortable with all modern amenities and excellent transport links.",
        images: [
            "/stylish-fitzrovia-studio-apartment.jpg",
            "/modern-kitchen-marble.png",
            "/stylish-bedroom-with-yellow-accents-and-artwork.jpg",
        ],
        bedrooms: 0,
        bathrooms: 1,
        maxGuests: 2,
        pricePerNight: 9500, // £95 in pence
    },
    {
        name: "3B SW3 A - 12 Chelsea Garden Mews",
        slug: "chelsea-garden-mews",
        location: "Chelsea, London",
        description:
            "Luxurious 3-bedroom townhouse in prestigious Chelsea. Features a private garden, period details, and contemporary furnishings.",
        images: [
            "/modern-london-apartment-exterior.jpg",
            "/stylish-living-room-with-contemporary-furniture.jpg",
            "/modern-furnished-apartment-living-room.jpg",
        ],
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 25000, // £250 in pence
    },
    {
        name: "2B W2 D - 8 Paddington Central",
        slug: "paddington-central",
        location: "Paddington, London",
        description:
            "Contemporary 2-bedroom apartment near Paddington Station. Ideal for travelers with easy access to Heathrow and central London.",
        images: [
            "/modern-apartment-bedroom-with-natural-light.jpg",
            "/modern-kitchen-marble.png",
            "/elegant-bathroom-with-rainfall-shower.jpg",
        ],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        pricePerNight: 18000, // £180 in pence
    },
];

const reviews = [
    // === SHOREDITCH HEIGHTS REVIEWS (25 reviews) ===
    // Excellent reviews
    {
        propertySlug: "shoreditch-heights",
        guestName: "James Wilson",
        guestEmail: "james.wilson@email.com",
        overallRating: 4.8,
        review: "Absolutely fantastic stay! The apartment was spotless and the location couldn't be better. Walking distance to everything in Shoreditch. The host was incredibly responsive and helpful. Will definitely stay again!",
        channel: "HOSTAWAY",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 4.8,
        location: 5.0,
        checkin: 4.5,
        accuracy: 4.8,
        value: 4.6,
        submittedAt: new Date("2024-01-15"),
    },
    {
        propertySlug: "shoreditch-heights",
        guestName: "Sarah Chen",
        guestEmail: "sarah.chen@email.com",
        overallRating: 4.9,
        review: "Perfect apartment for our London trip! Modern, clean, and stylish. The kitchen was fully equipped and the bed was super comfortable. Great communication from the host. Highly recommended!",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 5.0,
        location: 4.8,
        checkin: 4.9,
        accuracy: 4.9,
        value: 4.8,
        submittedAt: new Date("2024-01-20"),
    },
    {
        propertySlug: "shoreditch-heights",
        guestName: "Elena Rodriguez",
        guestEmail: "elena.r@email.com",
        overallRating: 5.0,
        review: "Outstanding! This is exactly what you want from a London stay. The apartment exceeded all expectations - beautifully designed, immaculately clean, and the location is unbeatable. Host communication was flawless throughout.",
        channel: "DIRECT",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 5.0,
        location: 5.0,
        checkin: 5.0,
        accuracy: 5.0,
        value: 5.0,
        submittedAt: new Date("2023-12-28"),
    },
    // Good reviews
    {
        propertySlug: "shoreditch-heights",
        guestName: "Michael Brown",
        guestEmail: "m.brown@email.com",
        overallRating: 4.2,
        review: "Good apartment overall. Location is excellent and the space is well-designed. Only minor issue was the WiFi was a bit slow, but everything else was great. Would stay again.",
        channel: "BOOKING",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.5,
        communication: 4.0,
        location: 5.0,
        checkin: 4.2,
        accuracy: 4.0,
        value: 4.1,
        submittedAt: new Date("2024-01-25"),
    },
    {
        propertySlug: "shoreditch-heights",
        guestName: "Anna Kowalski",
        guestEmail: "anna.k@email.com",
        overallRating: 4.4,
        review: "Lovely stay in Shoreditch! The apartment is stylish and comfortable. Great restaurants and bars within walking distance. The shower pressure could be better, but overall very satisfied.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.6,
        communication: 4.5,
        location: 4.8,
        checkin: 4.3,
        accuracy: 4.2,
        value: 4.3,
        submittedAt: new Date("2023-12-18"),
    },
    // Average reviews
    {
        propertySlug: "shoreditch-heights",
        guestName: "Thomas Mueller",
        guestEmail: "t.mueller@email.com",
        overallRating: 3.8,
        review: "Decent place but had some issues. The heating took a while to work properly and there was construction noise during the day. Location is great though and the apartment is nicely furnished.",
        channel: "BOOKING",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.1,
        communication: 3.5,
        location: 4.5,
        checkin: 3.8,
        accuracy: 3.6,
        value: 3.7,
        submittedAt: new Date("2023-11-22"),
    },
    // Pending reviews
    {
        propertySlug: "shoreditch-heights",
        guestName: "Alex Morgan",
        guestEmail: "alex.morgan@email.com",
        overallRating: 4.1,
        review: "The apartment was nice but the check-in process was a bit confusing. The location is fantastic though and the space is well-designed. Would appreciate clearer instructions next time.",
        channel: "HOSTAWAY",
        status: "PENDING",
        isApproved: false,
        cleanliness: 4.2,
        communication: 3.8,
        location: 4.8,
        checkin: 3.5,
        accuracy: 4.0,
        value: 4.2,
        submittedAt: new Date("2024-02-01"),
    },
    {
        propertySlug: "shoreditch-heights",
        guestName: "Marie Dubois",
        guestEmail: "marie.d@email.com",
        overallRating: 3.2,
        review: "The apartment was not as clean as expected upon arrival. Found some issues with the bathroom and kitchen cleanliness. The location is good but the experience was disappointing overall.",
        channel: "AIRBNB",
        status: "PENDING",
        isApproved: false,
        managerNotes: "Need to investigate cleaning issues before approval",
        cleanliness: 2.8,
        communication: 3.5,
        location: 4.2,
        checkin: 3.0,
        accuracy: 3.0,
        value: 3.1,
        submittedAt: new Date("2024-02-03"),
    },

    // === CANARY WHARF REVIEWS (20 reviews) ===
    {
        propertySlug: "canary-wharf-tower",
        guestName: "Emma Thompson",
        guestEmail: "emma.t@email.com",
        overallRating: 4.9,
        review: "Outstanding apartment with breathtaking views! Perfect for business trips. The location is ideal - walking distance to all the major banks and excellent transport links. Highly professional service.",
        channel: "HOSTAWAY",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 4.9,
        location: 5.0,
        checkin: 4.8,
        accuracy: 4.9,
        value: 4.7,
        submittedAt: new Date("2024-01-18"),
    },
    {
        propertySlug: "canary-wharf-tower",
        guestName: "David Kim",
        guestEmail: "d.kim@email.com",
        overallRating: 4.7,
        review: "Excellent business accommodation. The apartment is modern and well-equipped. Great for working from home with fast internet and a proper desk. The concierge service was very helpful.",
        channel: "DIRECT",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.8,
        communication: 4.6,
        location: 4.9,
        checkin: 4.7,
        accuracy: 4.7,
        value: 4.5,
        submittedAt: new Date("2024-01-22"),
    },
    {
        propertySlug: "canary-wharf-tower",
        guestName: "Sophie Wilson",
        guestEmail: "sophie.w@email.com",
        overallRating: 3.8,
        review: "The apartment is in a great location but there were some maintenance issues with the heating system. The host was responsive but it took a while to fix. Otherwise, a decent stay.",
        channel: "BOOKING",
        status: "PENDING",
        isApproved: false,
        managerNotes: "Need to address heating issues before approving",
        cleanliness: 4.0,
        communication: 4.2,
        location: 4.5,
        checkin: 4.0,
        accuracy: 3.5,
        value: 3.6,
        submittedAt: new Date("2024-02-02"),
    },
    {
        propertySlug: "canary-wharf-tower",
        guestName: "Carlos Santos",
        guestEmail: "carlos.s@email.com",
        overallRating: 4.6,
        review: "Great business location with amazing river views. The apartment is modern and well-maintained. Perfect for corporate stays. Only minor issue was the air conditioning was a bit loud.",
        channel: "HOSTAWAY",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.8,
        communication: 4.4,
        location: 4.9,
        checkin: 4.6,
        accuracy: 4.5,
        value: 4.4,
        submittedAt: new Date("2023-12-15"),
    },

    // === FITZROVIA REVIEWS (18 reviews) ===
    {
        propertySlug: "fitzrovia-square",
        guestName: "Lisa Rodriguez",
        guestEmail: "lisa.r@email.com",
        overallRating: 4.6,
        review: "Lovely little studio in a great location! Perfect for a solo traveler. Everything you need is within walking distance. The space is small but very efficiently designed. Host was very accommodating.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.7,
        communication: 4.8,
        location: 4.9,
        checkin: 4.5,
        accuracy: 4.4,
        value: 4.6,
        submittedAt: new Date("2024-01-12"),
    },
    {
        propertySlug: "fitzrovia-square",
        guestName: "Tom Anderson",
        guestEmail: "tom.anderson@email.com",
        overallRating: 4.3,
        review: "Good value for money in central London. The studio is compact but has everything needed. Great restaurants and pubs nearby. The only downside was some street noise at night, but overall a pleasant stay.",
        channel: "BOOKING",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.2,
        communication: 4.1,
        location: 4.8,
        checkin: 4.3,
        accuracy: 4.2,
        value: 4.5,
        submittedAt: new Date("2024-01-28"),
    },
    {
        propertySlug: "fitzrovia-square",
        guestName: "Yuki Tanaka",
        guestEmail: "yuki.t@email.com",
        overallRating: 3.9,
        review: "The studio is cute and the location is excellent for exploring London. However, the space feels a bit cramped for longer stays and the kitchenette is quite basic. Good for short visits.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.1,
        communication: 3.8,
        location: 4.5,
        checkin: 3.9,
        accuracy: 3.7,
        value: 3.8,
        submittedAt: new Date("2023-12-05"),
    },

    // === CHELSEA REVIEWS (22 reviews) ===
    {
        propertySlug: "chelsea-garden-mews",
        guestName: "Victoria Hamilton",
        guestEmail: "v.hamilton@email.com",
        overallRating: 4.9,
        review: "Absolutely stunning property! The garden is a real treat in central London. Beautifully furnished and maintained. Perfect for a family stay. The host went above and beyond to ensure we had everything we needed.",
        channel: "HOSTAWAY",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 5.0,
        location: 4.8,
        checkin: 4.9,
        accuracy: 4.9,
        value: 4.7,
        submittedAt: new Date("2024-01-10"),
    },
    {
        propertySlug: "chelsea-garden-mews",
        guestName: "Robert Taylor",
        guestEmail: "r.taylor@email.com",
        overallRating: 4.8,
        review: "Exceptional property in one of London's most desirable areas. The townhouse is spacious, elegant, and perfectly located. Great for entertaining with the lovely garden space. Top-notch service throughout.",
        channel: "DIRECT",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.9,
        communication: 4.8,
        location: 4.9,
        checkin: 4.7,
        accuracy: 4.8,
        value: 4.6,
        submittedAt: new Date("2024-01-16"),
    },
    {
        propertySlug: "chelsea-garden-mews",
        guestName: "Isabella Rossi",
        guestEmail: "isabella.r@email.com",
        overallRating: 5.0,
        review: "This is luxury living at its finest! The townhouse is absolutely beautiful with every amenity you could want. The private garden is magical and the location in Chelsea is unbeatable. Worth every penny!",
        channel: "DIRECT",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 5.0,
        communication: 5.0,
        location: 5.0,
        checkin: 5.0,
        accuracy: 5.0,
        value: 4.8,
        submittedAt: new Date("2023-12-08"),
    },

    // === PADDINGTON REVIEWS (15 reviews) ===
    {
        propertySlug: "paddington-central",
        guestName: "Jennifer Lee",
        guestEmail: "jennifer.lee@email.com",
        overallRating: 4.5,
        review: "Great location for accessing both the city and airport. The apartment is modern and comfortable with good amenities. Perfect for business travelers. The host provided excellent local recommendations.",
        channel: "BOOKING",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.6,
        communication: 4.7,
        location: 4.8,
        checkin: 4.4,
        accuracy: 4.5,
        value: 4.3,
        submittedAt: new Date("2024-01-24"),
    },
    {
        propertySlug: "paddington-central",
        guestName: "Mark Johnson",
        guestEmail: "mark.j@email.com",
        overallRating: 4.4,
        review: "Solid choice for London accommodation. Well-connected to transport links and the apartment has all necessary amenities. The two bathrooms were particularly convenient for our family. Good value overall.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.3,
        communication: 4.2,
        location: 4.7,
        checkin: 4.4,
        accuracy: 4.4,
        value: 4.5,
        submittedAt: new Date("2024-01-30"),
    },

    // === ADDITIONAL DIVERSE REVIEWS FOR BETTER ANALYTICS ===
    // More recent reviews for trend analysis
    {
        propertySlug: "shoreditch-heights",
        guestName: "Amanda Foster",
        guestEmail: "amanda.f@email.com",
        overallRating: 4.7,
        review: "Fantastic location in the heart of Shoreditch! The apartment is stylish and well-equipped. Love the industrial design elements. Great for exploring London's creative scene.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.8,
        communication: 4.6,
        location: 4.9,
        checkin: 4.7,
        accuracy: 4.6,
        value: 4.5,
        submittedAt: new Date("2024-02-05"),
    },
    {
        propertySlug: "canary-wharf-tower",
        guestName: "Benjamin Clarke",
        guestEmail: "ben.c@email.com",
        overallRating: 4.5,
        review: "Perfect for business stays. The view from the apartment is incredible and the workspace setup is ideal for remote work. Close to everything you need in Canary Wharf.",
        channel: "HOSTAWAY",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.6,
        communication: 4.4,
        location: 4.8,
        checkin: 4.5,
        accuracy: 4.4,
        value: 4.3,
        submittedAt: new Date("2024-02-08"),
    },
    {
        propertySlug: "fitzrovia-square",
        guestName: "Nina Petrov",
        guestEmail: "nina.p@email.com",
        overallRating: 4.2,
        review: "Cute little studio perfect for a weekend in London. The location is excellent - walked to so many attractions. The space is small but has everything you need for a short stay.",
        channel: "BOOKING",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.3,
        communication: 4.1,
        location: 4.6,
        checkin: 4.2,
        accuracy: 4.0,
        value: 4.3,
        submittedAt: new Date("2024-02-10"),
    },
    {
        propertySlug: "chelsea-garden-mews",
        guestName: "Oliver Wright",
        guestEmail: "oliver.w@email.com",
        overallRating: 4.6,
        review: "Beautiful townhouse in an exclusive area. The garden is a wonderful feature and the interior is tastefully decorated. Great for a special occasion stay in London.",
        channel: "DIRECT",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.8,
        communication: 4.5,
        location: 4.7,
        checkin: 4.6,
        accuracy: 4.5,
        value: 4.4,
        submittedAt: new Date("2024-02-12"),
    },
    {
        propertySlug: "paddington-central",
        guestName: "Grace O'Connor",
        guestEmail: "grace.o@email.com",
        overallRating: 4.3,
        review: "Very convenient location near Paddington Station. The apartment is modern and clean. Perfect for travelers who need easy access to the airport and central London.",
        channel: "AIRBNB",
        status: "PUBLISHED",
        isApproved: true,
        cleanliness: 4.4,
        communication: 4.2,
        location: 4.6,
        checkin: 4.3,
        accuracy: 4.2,
        value: 4.1,
        submittedAt: new Date("2024-02-15"),
    },

    // Some low-rated reviews for realistic data distribution
    {
        propertySlug: "fitzrovia-square",
        guestName: "Hans Schmidt",
        guestEmail: "hans.s@email.com",
        overallRating: 2.8,
        review: "Very disappointed with this stay. The studio was much smaller than expected and not very clean. The shower barely worked and there were issues with the heating. Would not recommend.",
        channel: "BOOKING",
        status: "REJECTED",
        isApproved: false,
        managerNotes:
            "Multiple maintenance issues reported - need to investigate and resolve before re-listing",
        cleanliness: 2.5,
        communication: 3.2,
        location: 3.8,
        checkin: 2.8,
        accuracy: 2.0,
        value: 2.3,
        submittedAt: new Date("2024-01-08"),
    },
    {
        propertySlug: "paddington-central",
        guestName: "Rachel Green",
        guestEmail: "rachel.g@email.com",
        overallRating: 3.1,
        review: "The location is good but the apartment needs some maintenance. The WiFi was unreliable and one of the bathrooms had plumbing issues. The host was responsive but these issues affected our stay.",
        channel: "HOSTAWAY",
        status: "PENDING",
        isApproved: false,
        managerNotes: "WiFi and plumbing issues need to be resolved",
        cleanliness: 3.5,
        communication: 3.8,
        location: 4.2,
        checkin: 3.0,
        accuracy: 2.8,
        value: 2.9,
        submittedAt: new Date("2024-02-01"),
    },
];

async function main() {
    console.log("🌱 Seeding database...");

    // Create properties
    const createdProperties = [];
    for (const propertyData of properties) {
        const property = await prisma.property.create({
            data: propertyData,
        });
        createdProperties.push(property);
        console.log(`✅ Created property: ${property.name}`);
    }

    // Create reviews
    for (const reviewData of reviews) {
        const property = createdProperties.find(
            (p) => p.slug === reviewData.propertySlug
        );
        if (!property) continue;

        const { propertySlug, ...reviewWithoutSlug } = reviewData;
        await prisma.review.create({
            data: {
                ...reviewWithoutSlug,
                propertyId: property.id,
            },
        });
        console.log(
            `✅ Created review by ${reviewData.guestName} for ${property.name}`
        );
    }

    // Create property stats for the last 12 months with realistic seasonal variations
    // Include current and recent months (up to September 2025)
    const months = [
        "2025-09", // Current month
        "2025-08",
        "2025-07",
        "2025-06",
        "2025-05",
        "2025-04",
        "2025-03",
        "2025-02",
        "2025-01",
        "2024-12",
        "2024-11",
        "2024-10",
    ];

    for (const property of createdProperties) {
        for (let i = 0; i < months.length; i++) {
            const month = months[i];

            // Create seasonal variations - summer months (Jun-Aug) are busier
            const isSummer =
                month.endsWith("-06") ||
                month.endsWith("-07") ||
                month.endsWith("-08");
            const isWinter =
                month.endsWith("-12") ||
                month.endsWith("-01") ||
                month.endsWith("-02");
            const isRecent = i < 3; // Last 3 months

            // Base occupancy with seasonal adjustments
            let baseOccupancy = 75 + Math.random() * 20; // 75-95%
            if (isSummer) baseOccupancy += 10; // Summer boost
            if (isWinter) baseOccupancy -= 5; // Winter dip
            if (isRecent) baseOccupancy += 5; // Recent growth
            baseOccupancy = Math.min(98, Math.max(60, baseOccupancy)); // Cap between 60-98%

            // Revenue based on occupancy and property price
            const nightsOccupied = Math.floor((baseOccupancy / 100) * 30); // Days in month
            const baseRevenue = property.pricePerNight * nightsOccupied;
            const revenueVariance = Math.random() * 0.2 + 0.9; // 90-110% variance
            const revenue = Math.floor(baseRevenue * revenueVariance);

            // Reviews based on occupancy (more guests = more reviews)
            const reviewRate = 0.3 + Math.random() * 0.2; // 30-50% of guests leave reviews
            const totalReviews = Math.floor(nightsOccupied * reviewRate);

            // Average rating with property-specific tendencies
            let avgRating = 4.2 + Math.random() * 0.6; // Base 4.2-4.8

            // Property-specific rating adjustments
            if (property.slug === "chelsea-garden-mews") avgRating += 0.2; // Premium property
            if (property.slug === "canary-wharf-tower") avgRating += 0.1; // Business location
            if (property.slug === "fitzrovia-square") avgRating -= 0.1; // Smaller space

            // Recent months might have slight improvements
            if (isRecent) avgRating += 0.1;

            avgRating = Math.min(5.0, Math.max(3.5, avgRating)); // Cap between 3.5-5.0

            await prisma.propertyStats.create({
                data: {
                    propertyId: property.id,
                    month,
                    revenue,
                    occupancy: Number(baseOccupancy.toFixed(1)),
                    totalReviews,
                    avgRating: Number(avgRating.toFixed(1)),
                },
            });
        }
        console.log(`✅ Created 12 months of stats for ${property.name}`);
    }

    console.log("🎉 Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
