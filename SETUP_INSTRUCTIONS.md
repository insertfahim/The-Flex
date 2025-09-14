# Flex Living Reviews Dashboard - Setup Instructions

## Quick Start

### Prerequisites

-   Node.js 18+ installed
-   npm or pnpm package manager

### Installation

1. **Install Dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

2. **Environment Variables** (Optional)
   Create a `.env.local` file in the root directory:

    ```env
    # Optional: Enable Google Reviews integration
    GOOGLE_PLACES_API_KEY=your_google_api_key_here

    # Hostaway credentials (already configured in code for demo)
    HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
    HOSTAWAY_ACCOUNT_ID=61148
    ```

3. **Start Development Server**

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

4. **Access the Application**
    - Main site: http://localhost:3000
    - Manager Dashboard: http://localhost:3000/dashboard
    - Reviews Management: http://localhost:3000/dashboard/reviews
    - Analytics: http://localhost:3000/dashboard/analytics

## Key Features Demo

### 1. Reviews Management Dashboard

-   Navigate to `/dashboard/reviews`
-   Filter reviews by rating, status, channel, or property
-   Approve/reject reviews with manager notes
-   See real-time statistics

### 2. Property Page Integration

-   Visit any property page (e.g., `/property/shoreditch-heights`)
-   Only approved reviews are displayed in the reviews section
-   Reviews update automatically when approval status changes

### 3. Manager Dashboard

-   Main dashboard at `/dashboard`
-   Quick access to review management
-   Property performance overview
-   Analytics integration

### 4. Google Reviews (Optional)

-   Requires `GOOGLE_PLACES_API_KEY` environment variable
-   Visit `/dashboard/reviews` and look for Google integration
-   Search for businesses and import reviews

## API Endpoints

### Core Endpoints

-   `GET /api/reviews` - Get all reviews with filtering
-   `GET /api/reviews/hostaway` - Get Hostaway reviews specifically
-   `POST /api/reviews/[id]/approve` - Approve/reject reviews
-   `GET /api/reviews/google` - Google Reviews integration

### Example API Calls

```bash
# Get all approved reviews
curl "http://localhost:3000/api/reviews?status=approved"

# Get reviews for specific property
curl "http://localhost:3000/api/reviews?listing=Shoreditch"

# Get high-rated reviews only
curl "http://localhost:3000/api/reviews?rating=8"
```

## Mock Data

The system includes comprehensive mock data when the Hostaway API returns no results:

-   10 diverse reviews across 3 properties
-   Various rating levels (3-10 stars)
-   Different review statuses (published, pending, rejected)
-   Realistic guest names and review content
-   Category-specific ratings

## Architecture Overview

```
├── app/
│   ├── api/reviews/          # API routes
│   ├── dashboard/            # Manager interfaces
│   │   ├── page.tsx         # Main dashboard
│   │   ├── reviews/         # Reviews management
│   │   └── analytics/       # Analytics dashboard
│   └── property/[slug]/     # Public property pages
├── components/              # Reusable UI components
├── lib/                    # Business logic and utilities
├── types/                  # TypeScript definitions
└── hooks/                  # Custom React hooks
```

## Production Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel

# Set environment variables in Vercel dashboard
GOOGLE_PLACES_API_KEY=your_key_here
```

### Other Platforms

-   Ensure Node.js 18+ runtime
-   Set environment variables
-   Build with `npm run build`
-   Start with `npm start`

## Troubleshooting

### Common Issues

1. **Reviews not loading**

    - Check network tab for API errors
    - Verify Hostaway API credentials
    - Mock data should load as fallback

2. **Google Reviews not working**

    - Ensure `GOOGLE_PLACES_API_KEY` is set
    - Check Google Cloud Console for API enablement
    - Verify billing is enabled

3. **Approval not persisting**
    - Currently uses in-memory storage
    - Refreshing page resets approval state
    - Production would use database

### Development Tips

-   Use browser dev tools to inspect API calls
-   Check console for error messages
-   Review network tab for failed requests
-   Use React Developer Tools for component debugging

## Next Steps

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Authentication**: Add user authentication system
3. **Real-time Updates**: Implement WebSocket for live updates
4. **Email Notifications**: Alert managers of new reviews
5. **Advanced Analytics**: Add more sophisticated reporting

---

## Support

For technical questions or issues:

1. Check the comprehensive documentation in `FLEX_REVIEWS_DOCUMENTATION.md`
2. Review the codebase for implementation details
3. Test API endpoints directly using the provided examples
4. Use browser developer tools for debugging

The system is designed to work out-of-the-box with mock data, making it easy to demo and test all features without external dependencies.
