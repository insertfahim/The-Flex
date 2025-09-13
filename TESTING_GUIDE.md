# Testing Guide - Flex Living Reviews Dashboard

## 🧪 Complete Testing Checklist

### 1. Hostaway API Integration Testing ✅

#### Test the API endpoint directly:

```bash
# Test Hostaway endpoint
curl http://localhost:3001/api/reviews/hostaway

# Expected: JSON response with normalized review data
# Status: 200 OK with mock data (since sandbox API is empty)
```

#### Test through the main reviews endpoint:

```bash
# Test main reviews endpoint
curl http://localhost:3001/api/reviews

# Expected: Filtered reviews with applied approval statuses
```

### 2. Manager Dashboard Testing ✅

#### Access the dashboard:

1. Open: `http://localhost:3001/dashboard`
2. **Verify**: Reviews load with statistics cards
3. **Test Filtering**: Use filter panel to filter by rating, status, property
4. **Test Approval**: Click approve/reject buttons on review cards
5. **Test Notes**: Add manager notes when approving/rejecting

#### Dashboard Features to Test:

-   [ ] Statistics cards show correct numbers
-   [ ] Filter by rating (e.g., 8+ stars)
-   [ ] Filter by status (published, pending)
-   [ ] Filter by property name (e.g., "Shoreditch")
-   [ ] Approve/reject individual reviews
-   [ ] Add manager notes to approvals
-   [ ] Refresh data and see changes persist

### 3. Analytics Dashboard Testing ✅

#### Access analytics:

1. Open: `http://localhost:3001/dashboard/analytics`
2. **Verify**: Charts and metrics display correctly
3. **Test**: Interactive chart elements
4. **Check**: Property performance comparisons

#### Analytics Features to Test:

-   [ ] Rating distribution chart
-   [ ] Monthly trends visualization
-   [ ] Property performance comparison
-   [ ] Issue detection and alerts
-   [ ] Category average breakdowns

### 4. Public Review Display Testing ✅

#### Test property pages:

1. Open: `http://localhost:3001/property/2b-n1-a-29-shoreditch-heights`
2. **Verify**: Only approved reviews are shown
3. **Test**: Pagination if many reviews
4. **Check**: Star ratings and guest information

#### Property Page Features to Test:

-   [ ] Property hero section loads
-   [ ] Reviews section shows only approved reviews
-   [ ] Star ratings display correctly
-   [ ] Guest names and dates show
-   [ ] Pagination works (if applicable)
-   [ ] Mobile responsive design

### 5. Google Reviews Integration Testing ✅

#### Test the Google API endpoint:

```bash
# Test Google Reviews endpoint (without API key)
curl http://localhost:3001/api/reviews/google

# Expected: 503 status with helpful documentation
```

#### With API key (if available):

```bash
# Test with search query
curl "http://localhost:3001/api/reviews/google?query=Shoreditch Heights London"

# Expected: Normalized Google reviews data
```

#### Google Integration Features to Test:

-   [ ] API returns helpful error without key
-   [ ] Documentation explains setup steps
-   [ ] Cost considerations are clearly stated
-   [ ] Ready for production with proper key

### 6. Review Approval System Testing ✅

#### Test approval API directly:

```bash
# Approve a review
curl -X POST http://localhost:3001/api/reviews/7453/approve \
  -H "Content-Type: application/json" \
  -d '{"approved": true, "managerNotes": "Great review!", "updatedBy": "manager"}'

# Expected: Success response with approval data
```

#### Test approval persistence:

1. Approve a review in dashboard
2. Refresh the page
3. **Verify**: Approval status is maintained
4. Check property page
5. **Verify**: Approved review appears

#### Approval System Features to Test:

-   [ ] Approval status persists across refreshes
-   [ ] Manager notes are saved and displayed
-   [ ] Approved reviews appear on property pages
-   [ ] Rejected reviews don't appear publicly
-   [ ] API validation works correctly

### 7. Responsive Design Testing ✅

#### Test on different screen sizes:

1. **Desktop**: Full dashboard experience
2. **Tablet**: Responsive grid layouts
3. **Mobile**: Touch-friendly interfaces

#### Responsive Features to Test:

-   [ ] Dashboard works on mobile
-   [ ] Property pages are mobile-friendly
-   [ ] Charts/analytics are readable
-   [ ] Navigation is accessible
-   [ ] Touch interactions work

### 8. Error Handling Testing ✅

#### Test various error conditions:

```bash
# Test invalid review ID
curl -X POST http://localhost:3001/api/reviews/invalid/approve

# Test missing data
curl -X POST http://localhost:3001/api/reviews/123/approve \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Error Handling Features to Test:

-   [ ] Invalid API requests return proper errors
-   [ ] Network failures show user-friendly messages
-   [ ] Loading states display during requests
-   [ ] Graceful degradation when APIs fail

### 9. Performance Testing ✅

#### Test application performance:

1. **Load Time**: Dashboard loads quickly
2. **API Response**: Reviews fetch in reasonable time
3. **Interactions**: Smooth approval/rejection
4. **Navigation**: Fast page transitions

#### Performance Features to Test:

-   [ ] Initial page load < 3 seconds
-   [ ] API responses < 1 second
-   [ ] Smooth scrolling and interactions
-   [ ] No memory leaks or console errors

### 10. Data Integrity Testing ✅

#### Test data consistency:

1. **Mock Data**: Verify diverse, realistic reviews
2. **Normalization**: Check consistent data format
3. **Filtering**: Ensure accurate filter results
4. **Approval State**: Verify persistence

#### Data Features to Test:

-   [ ] Mock data is realistic and diverse
-   [ ] All reviews follow NormalizedReview interface
-   [ ] Filters return correct subsets
-   [ ] Approval states are consistent
-   [ ] No data corruption or loss

## 🎯 Quick Verification Script

Run this in your browser console on any page to verify the app is working:

```javascript
// Test API endpoints
async function testAPIs() {
    console.log("Testing Flex Reviews Dashboard APIs...");

    // Test main reviews
    const reviews = await fetch("/api/reviews").then((r) => r.json());
    console.log("✅ Reviews API:", reviews.success ? "Working" : "Failed");

    // Test Hostaway
    const hostaway = await fetch("/api/reviews/hostaway").then((r) => r.json());
    console.log("✅ Hostaway API:", hostaway.success ? "Working" : "Failed");

    // Test Google (should fail gracefully)
    const google = await fetch("/api/reviews/google").then((r) => r.json());
    console.log(
        "✅ Google API:",
        google.error ? "Properly disabled" : "Unexpected"
    );

    console.log("All APIs tested!");
}

testAPIs();
```

## ✅ Success Criteria

**The implementation is successful if:**

-   [ ] All API endpoints return proper responses
-   [ ] Dashboard loads and allows review management
-   [ ] Property pages show only approved reviews
-   [ ] Google integration is documented and ready
-   [ ] No console errors or TypeScript issues
-   [ ] Responsive design works across devices
-   [ ] Review approval system persists data
-   [ ] Analytics dashboard shows meaningful insights

## 🚀 Demo Flow

**Recommended demo sequence:**

1. Start at homepage (`/`)
2. Go to dashboard (`/dashboard`)
3. Filter and approve some reviews
4. Visit analytics (`/dashboard/analytics`)
5. Check property page (`/property/...`)
6. Verify only approved reviews show
7. Test API endpoints directly

**This completes the comprehensive implementation of the Flex Living Reviews Dashboard!**
