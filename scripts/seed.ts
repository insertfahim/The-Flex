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
    // Shoreditch Heights reviews
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

    // Canary Wharf reviews
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

    // Fitzrovia reviews
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

    // Chelsea reviews
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

    // Paddington reviews
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

    // Some pending reviews for dashboard demo
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

    // Create property stats for the last 6 months
    const months = [
        "2024-01",
        "2024-02",
        "2023-12",
        "2023-11",
        "2023-10",
        "2023-09",
    ];

    for (const property of createdProperties) {
        for (const month of months) {
            // Generate realistic stats based on property
            const baseRevenue = property.pricePerNight * 20; // Assume ~20 nights per month
            const variance = Math.random() * 0.3 + 0.85; // 85-115% variance
            const revenue = Math.floor(baseRevenue * variance);

            const occupancy = Math.random() * 30 + 70; // 70-100% occupancy
            const totalReviews = Math.floor(Math.random() * 8 + 2); // 2-10 reviews per month
            const avgRating = Math.random() * 1 + 4.0; // 4.0-5.0 rating

            await prisma.propertyStats.create({
                data: {
                    propertyId: property.id,
                    month,
                    revenue,
                    occupancy,
                    totalReviews,
                    avgRating,
                },
            });
        }
        console.log(`✅ Created stats for ${property.name}`);
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
