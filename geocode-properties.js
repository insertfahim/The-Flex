/**
 * Script to geocode all properties and update them with Mapbox coordinates
 */

const MAPBOX_API_KEY =
    "pk.eyJ1IjoiZmFoaW0wNiIsImEiOiJjbWZqem8wbjUxMDFwMmpxdDFwanB4ODB0In0.H4_x_lN4g4p3YkNoZhp7dA";

// Sample properties from the application
const properties = [
    {
        id: 1,
        name: "Stunning 2 Bed Flat near Chiswick Park",
        location: "Chiswick, London",
    },
    {
        id: 2,
        name: "2B N1 A - 29 Shoreditch Heights",
        location: "Shoreditch, London",
    },
    {
        id: 3,
        name: "1B E1 B - 15 Canary Wharf Tower",
        location: "Canary Wharf, London",
    },
    {
        id: 4,
        name: "Studio W1 C - 42 Fitzrovia Square",
        location: "Fitzrovia, London",
    },
    {
        id: 5,
        name: "3B SW3 A - 12 Chelsea Garden Mews",
        location: "Chelsea, London",
    },
    {
        id: 6,
        name: "2B W2 D - 8 Paddington Central",
        location: "Paddington, London",
    },
    {
        id: 7,
        name: "1B EC1 A - 23 Clerkenwell Loft",
        location: "Clerkenwell, London",
    },
    {
        id: 8,
        name: "2B SE1 B - 45 Borough Market View",
        location: "Borough, London",
    },
];

async function geocodeProperty(property) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                property.location
            )}.json?access_token=${MAPBOX_API_KEY}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
            return {
                ...property,
                latitude: latitude,
                longitude: longitude,
                address: data.features[0].place_name,
                success: true,
            };
        } else {
            return {
                ...property,
                success: false,
                error: "No results found",
            };
        }
    } catch (error) {
        return {
            ...property,
            success: false,
            error: error.message,
        };
    }
}

async function geocodeAllProperties() {
    console.log("🗺️  Starting geocoding for all properties...\n");

    const results = [];

    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        console.log(
            `📍 Geocoding ${i + 1}/${properties.length}: ${property.name}`
        );

        const result = await geocodeProperty(property);
        results.push(result);

        if (result.success) {
            console.log(
                `   ✅ ${result.latitude.toFixed(
                    6
                )}, ${result.longitude.toFixed(6)}`
            );
            console.log(`   📍 ${result.address}`);
        } else {
            console.log(`   ❌ Failed: ${result.error}`);
        }

        // Add delay between requests to respect rate limits
        if (i < properties.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        console.log("");
    }

    console.log("📊 Summary:");
    console.log(`   Total properties: ${properties.length}`);
    console.log(
        `   Successfully geocoded: ${results.filter((r) => r.success).length}`
    );
    console.log(`   Failed: ${results.filter((r) => !r.success).length}`);

    console.log("\n🔧 TypeScript interface for properties with coordinates:\n");

    const successfulResults = results.filter((r) => r.success);
    successfulResults.forEach((property) => {
        console.log(`{
    id: ${property.id},
    name: "${property.name}",
    location: "${property.location}",
    latitude: ${property.latitude},
    longitude: ${property.longitude},
    address: "${property.address}",
},`);
    });

    return results;
}

// Run the geocoding
geocodeAllProperties();
