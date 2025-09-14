/**
 * Test script to demonstrate dynamic review status updates
 * Run this in the browser console to test real-time updates
 */

// Function to reject James Wilson's review
async function rejectJamesWilsonReview() {
    console.log("🔄 Rejecting James Wilson's review...");

    const response = await fetch("/api/reviews/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            reviewId: 1, // Assuming James Wilson's review has ID 1
            status: "REJECTED",
            isApproved: false,
        }),
    });

    const result = await response.json();
    console.log("Result:", result);
    console.log(
        "✅ James Wilson review should disappear from homepage within 30 seconds!"
    );
}

// Function to re-approve James Wilson's review
async function approveJamesWilsonReview() {
    console.log("🔄 Re-approving James Wilson's review...");

    const response = await fetch("/api/reviews/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            reviewId: 1, // Assuming James Wilson's review has ID 1
            status: "PUBLISHED",
            isApproved: true,
        }),
    });

    const result = await response.json();
    console.log("Result:", result);
    console.log(
        "✅ James Wilson review should reappear on homepage within 30 seconds!"
    );
}

// Make functions available globally
window.rejectJamesWilsonReview = rejectJamesWilsonReview;
window.approveJamesWilsonReview = approveJamesWilsonReview;

console.log("📋 Dynamic Review Testing Loaded!");
console.log("🔧 Available functions:");
console.log("  - rejectJamesWilsonReview()  // Hide review from public");
console.log("  - approveJamesWilsonReview() // Show review on public");
console.log("");
console.log(
    "💡 Try running these functions and watch the homepage update automatically!"
);
