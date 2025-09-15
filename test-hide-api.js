// Test the Hide button API functionality
const testHideButton = async () => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/reviews/public-visibility",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reviewIds: [1],
                    isPubliclyDisplayed: false,
                }),
            }
        );

        const result = await response.json();
        console.log("API Response Status:", response.status);
        console.log("API Response:", result);

        if (response.ok) {
            console.log("✅ Hide button API is functional!");
        } else {
            console.log("❌ Hide button API failed:", result);
        }
    } catch (error) {
        console.error("❌ API call failed:", error);
    }
};

testHideButton();
