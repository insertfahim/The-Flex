/**
 * Mapbox API Test Script
 * Tests the provided Mapbox API key for basic functionality
 */

const MAPBOX_API_KEY =
    "pk.eyJ1IjoiZmFoaW0wNiIsImEiOiJjbWZqem8wbjUxMDFwMmpxdDFwanB4ODB0In0.H4_x_lN4g4p3YkNoZhp7dA";

async function testMapboxAPI() {
    console.log("🗺️  Testing Mapbox API...\n");
    console.log(`API Key: ${MAPBOX_API_KEY.substring(0, 20)}...`);

    try {
        // Test 1: Geocoding API - Convert address to coordinates
        console.log("\n📍 Test 1: Geocoding API (Address to Coordinates)");
        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=${MAPBOX_API_KEY}`;

        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        if (
            geocodingResponse.ok &&
            geocodingData.features &&
            geocodingData.features.length > 0
        ) {
            const [longitude, latitude] = geocodingData.features[0].center;
            console.log("✅ Geocoding API: SUCCESS");
            console.log(`   Location: ${geocodingData.features[0].place_name}`);
            console.log(`   Coordinates: ${latitude}, ${longitude}`);
        } else {
            console.log("❌ Geocoding API: FAILED");
            console.log("   Error:", geocodingData.message || "Unknown error");
        }

        // Test 2: Reverse Geocoding - Convert coordinates to address
        console.log(
            "\n📍 Test 2: Reverse Geocoding API (Coordinates to Address)"
        );
        const reverseGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/-0.1276,51.5074.json?access_token=${MAPBOX_API_KEY}`;

        const reverseResponse = await fetch(reverseGeocodingUrl);
        const reverseData = await reverseResponse.json();

        if (
            reverseResponse.ok &&
            reverseData.features &&
            reverseData.features.length > 0
        ) {
            console.log("✅ Reverse Geocoding API: SUCCESS");
            console.log(`   Address: ${reverseData.features[0].place_name}`);
        } else {
            console.log("❌ Reverse Geocoding API: FAILED");
            console.log("   Error:", reverseData.message || "Unknown error");
        }

        // Test 3: Static Maps API - Generate a map image URL
        console.log("\n🗺️  Test 3: Static Maps API");
        const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(-0.1276,51.5074)/-0.1276,51.5074,14,0/400x300@2x?access_token=${MAPBOX_API_KEY}`;

        const mapResponse = await fetch(staticMapUrl, { method: "HEAD" });

        if (mapResponse.ok) {
            console.log("✅ Static Maps API: SUCCESS");
            console.log(`   Map URL: ${staticMapUrl.substring(0, 80)}...`);
            console.log(`   Response Status: ${mapResponse.status}`);
            console.log(
                `   Content Type: ${mapResponse.headers.get("content-type")}`
            );
        } else {
            console.log("❌ Static Maps API: FAILED");
            console.log(`   Status: ${mapResponse.status}`);
        }

        // Test 4: Directions API - Get route between two points
        console.log("\n🛣️  Test 4: Directions API");
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/-0.1276,51.5074;-0.0929,51.5151?geometries=geojson&access_token=${MAPBOX_API_KEY}`;

        const directionsResponse = await fetch(directionsUrl);
        const directionsData = await directionsResponse.json();

        if (
            directionsResponse.ok &&
            directionsData.routes &&
            directionsData.routes.length > 0
        ) {
            const route = directionsData.routes[0];
            console.log("✅ Directions API: SUCCESS");
            console.log(
                `   Distance: ${(route.distance / 1000).toFixed(2)} km`
            );
            console.log(
                `   Duration: ${Math.round(route.duration / 60)} minutes`
            );
        } else {
            console.log("❌ Directions API: FAILED");
            console.log("   Error:", directionsData.message || "Unknown error");
        }

        // Test 5: API Key validation
        console.log("\n🔑 Test 5: API Key Information");
        try {
            // Decode the token to get basic info (public part only)
            const tokenParts = MAPBOX_API_KEY.split(".");
            if (tokenParts.length === 3 && tokenParts[0] === "pk") {
                const payload = JSON.parse(atob(tokenParts[1]));
                console.log("✅ API Key Format: VALID");
                console.log(`   Username: ${payload.u}`);
                console.log(`   Token ID: ${payload.a}`);
            }
        } catch (error) {
            console.log("❌ API Key Format: INVALID");
            console.log("   Error:", error.message);
        }
    } catch (error) {
        console.log("\n❌ Test failed with error:", error.message);
    }

    console.log("\n🏁 Mapbox API testing completed!");
}

// Run the test
testMapboxAPI();
