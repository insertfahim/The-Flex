# Flex Living - Reviews Dashboard# Flex Living - Reviews Dashboard

A comprehensive reviews management dashboard built for Flex Living's developer assessment. This application helps property managers assess performance based on guest reviews, manage public review displays, and gain insights into property performance trends.A comprehensive reviews management dashboard built for Flex Living's developer assessment. This application helps property managers assess performance based on guest reviews, manage public review displays, and gain insights into property performance trends.

## 🔗 Live Demo & Repository## 🔗 Live Demo & Repository

-   **🌐 Live Application**: [https://the-flex.fahimbuilds.me/](https://the-flex.fahimbuilds.me/)- **🌐 Live Application**: [https://the-flex.fahimbuilds.me/](https://the-flex.fahimbuilds.me/)

-   **📁 GitHub Repository**: [https://github.com/insertfahim/The-Flex](https://github.com/insertfahim/The-Flex)- **📁 GitHub Repository**: [https://github.com/insertfahim/The-Flex](https://github.com/insertfahim/The-Flex)

## 📋 Project Overview## 📋 Project Overview

This project was developed as part of the Flex Living developer assessment, implementing a complete reviews management system that integrates with external APIs, provides analytical insights, and manages public review displays.This project was developed as part of the Flex Living developer assessment, implementing a complete reviews management system that integrates with external APIs, provides analytical insights, and manages public review displays.

### Assessment Requirements Fulfilled### Assessment Requirements Fulfilled

✅ **Hostaway Integration (Mocked)** - Complete API integration with mock data support ✅ **Hostaway Integration (Mocked)** - Complete API integration with mock data support

✅ **Manager Dashboard** - Modern, intuitive interface for review management ✅ **Manager Dashboard** - Modern, intuitive interface for review management

✅ **Review Display Page** - Public-facing review section with Flex Living styling ✅ **Review Display Page** - Public-facing review section with Flex Living styling

✅ **Maps Integration** - Mapbox implementation (used instead of Google Places API) ✅ **Maps Integration** - Mapbox implementation (used instead of Google Places API)

## 🚀 Features## 🚀 Features

### Manager Dashboard### Manager Dashboard### Manager Dashboard

-   **Property Performance Analytics**: Comprehensive metrics and KPIs for each property

-   **Review Management**: Filter, sort, and approve reviews for public display- **Property Performance Analytics**: Comprehensive metrics and KPIs for each property

-   **Trend Analysis**: Identify patterns and recurring issues across properties

-   **Bulk Operations**: Efficiently manage multiple reviews simultaneously- **Review Management**: Filter, sort, and approve reviews for public display- **Property Performance Analytics**: Comprehensive metrics and KPIs for each property

-   **Performance Alerts**: Automated notifications for underperforming properties

-   **Trend Analysis**: Identify patterns and recurring issues across properties- **Review Management**: Filter, sort, and approve reviews for public display

### Public Review Display

-   **Flex Living Style Integration**: Seamlessly integrated with property detail pages- **Bulk Operations**: Efficiently manage multiple reviews simultaneously- **Trend Analysis**: Identify patterns and recurring issues across properties

-   **Approved Reviews Only**: Only manager-approved reviews are displayed publicly

-   **Responsive Design**: Optimized for all device sizes- **Performance Alerts**: Automated notifications for underperforming properties- **Bulk Operations**: Efficiently manage multiple reviews simultaneously

-   **Interactive Filtering**: Guests can filter reviews by rating and category

-   **Performance Alerts**: Automated notifications for underperforming properties

### API Integration

-   **Hostaway Reviews API**: Full integration with data normalization### Public Review Display

-   **Real-time Sync**: Automatic review data synchronization

-   **Error Handling**: Robust error handling and retry mechanisms- **Flex Living Style Integration**: Seamlessly integrated with property detail pages### Public Review Display

-   **Mock Data Support**: Comprehensive mock data for development and testing

-   **Approved Reviews Only**: Only manager-approved reviews are displayed publicly

## 🛠 Tech Stack

-   **Responsive Design**: Optimized for all device sizes- **Flex Living Style Integration**: Seamlessly integrated with property detail pages

-   **Framework**: Next.js 14 with App Router

-   **Language**: TypeScript- **Interactive Filtering**: Guests can filter reviews by rating and category- **Approved Reviews Only**: Only manager-approved reviews are displayed publicly

-   **Styling**: Tailwind CSS + Radix UI Components

-   **Database**: PostgreSQL with Prisma ORM- **Responsive Design**: Optimized for all device sizes

-   **Maps**: Mapbox GL JS (chosen over Google Places API)

-   **State Management**: React Hooks + Context API### API Integration- **Interactive Filtering**: Guests can filter reviews by rating and category

-   **API Integration**: Custom API routes with data normalization

-   **Authentication**: NextAuth.js- **Hostaway Reviews API**: Full integration with data normalization

-   **Analytics**: Custom analytics dashboard + Vercel Analytics

-   **Real-time Sync**: Automatic review data synchronization### API Integration

### Why Mapbox Instead of Google Places API?

-   **Error Handling**: Robust error handling and retry mechanisms

Mapbox was chosen over Google Places API due to:

-   **No Credit Card Requirement**: Google Cloud Console requires credit card verification for API activation- **Mock Data Support**: Comprehensive mock data for development and testing- **Hostaway Reviews API**: Full integration with data normalization

-   **Developer-Friendly**: More straightforward setup process for assessment purposes

-   **Feature Parity**: Provides all required mapping functionality for the project- **Real-time Sync**: Automatic review data synchronization

-   **Cost Effective**: Better pricing structure for development and testing

## 🛠 Tech Stack- **Error Handling**: Robust error handling and retry mechanisms

## 📊 Key Design Decisions

-   **Mock Data Support**: Comprehensive mock data for development and testing

### Data Architecture

-   **Normalized Review Structure**: Standardized format across different review sources- **Framework**: Next.js 14 with App Router

-   **Property Performance Metrics**: Calculated fields for quick dashboard insights

-   **Approval Workflow**: Clear separation between internal and public-facing reviews- **Language**: TypeScript## � Tech Stack

### UX/UI Approach- **Styling**: Tailwind CSS + Radix UI Components

-   **Product Manager Mindset**: Designed with actual property manager workflows in mind

-   **Progressive Disclosure**: Complex features accessible but not overwhelming- **Database**: PostgreSQL with Prisma ORM- **Framework**: Next.js 14 with App Router

-   **Mobile-First**: Responsive design ensuring usability across devices

-   **Accessibility**: WCAG compliant components and keyboard navigation- **Maps**: Mapbox GL JS (chosen over Google Places API)- **Language**: TypeScript

### API Design- **State Management**: React Hooks + Context API- **Styling**: Tailwind CSS + Radix UI Components

-   **RESTful Structure**: Clear, predictable API endpoints

-   **Data Normalization**: Consistent response formats across different sources- **API Integration**: Custom API routes with data normalization- **Database**: PostgreSQL with Prisma ORM

-   **Error Handling**: Comprehensive error responses with actionable messages

-   **Performance Optimization**: Efficient queries and caching strategies- **Authentication**: NextAuth.js- **Maps**: Mapbox GL JS (chosen over Google Places API)

## 🔧 Installation & Setup- **Analytics**: Custom analytics dashboard + Vercel Analytics- **State Management**: React Hooks + Context API

### Prerequisites- **API Integration**: Custom API routes with data normalization

-   Node.js 18+

-   PostgreSQL database### Why Mapbox Instead of Google Places API?- **Authentication**: NextAuth.js

-   Mapbox account (free tier available)

-   **Analytics**: Custom analytics dashboard + Vercel Analytics

### Quick Start

Mapbox was chosen over Google Places API due to:

1. **Clone and Install**

````bash- **No Credit Card Requirement**: Google Cloud Console requires credit card verification for API activation### Why Mapbox Instead of Google Places API?

git clone https://github.com/insertfahim/The-Flex.git

cd The-Flex-   **Developer-Friendly**: More straightforward setup process for assessment purposes

npm install

```-   **Feature Parity**: Provides all required mapping functionality for the projectMapbox was chosen over Google Places API due to:



2. **Environment Configuration**-   **Cost Effective**: Better pricing structure for development and testing

```bash

cp .env.example .env.local-   **No Credit Card Requirement**: Google Cloud Console requires credit card verification for API activation

````

## 📊 Key Design Decisions- **Developer-Friendly**: More straightforward setup process for assessment purposes

Configure your `.env.local`:

````env- **Feature Parity**: Provides all required mapping functionality for the project

# Database

DATABASE_URL="postgresql://username:password@localhost:5432/flex_reviews"### Data Architecture- **Cost Effective**: Better pricing structure for development and testing



# Hostaway API (Assessment Credentials)-   **Normalized Review Structure**: Standardized format across different review sources

HOSTAWAY_API_KEY="f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152"

HOSTAWAY_ACCOUNT_ID="61148"-   **Property Performance Metrics**: Calculated fields for quick dashboard insights## 📊 Key Design Decisions



# Mapbox-   **Approval Workflow**: Clear separation between internal and public-facing reviews

NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_token"

### Data Architecture

# NextAuth

NEXTAUTH_SECRET="your_nextauth_secret"### UX/UI Approach

NEXTAUTH_URL="http://localhost:3000"

```-   **Product Manager Mindset**: Designed with actual property manager workflows in mind- **Normalized Review Structure**: Standardized format across different review sources



3. **Database Setup**-   **Progressive Disclosure**: Complex features accessible but not overwhelming- **Property Performance Metrics**: Calculated fields for quick dashboard insights

```bash

npx prisma migrate dev-   **Mobile-First**: Responsive design ensuring usability across devices- **Approval Workflow**: Clear separation between internal and public-facing reviews

npx prisma db seed

```-   **Accessibility**: WCAG compliant components and keyboard navigation



4. **Start Development Server**### UX/UI Approach

```bash

npm run dev### API Design

````

-   **RESTful Structure**: Clear, predictable API endpoints- **Product Manager Mindset**: Designed with actual property manager workflows in mind

Access the application at [http://localhost:3000](http://localhost:3000)

-   **Data Normalization**: Consistent response formats across different sources- **Progressive Disclosure**: Complex features accessible but not overwhelming

## 📚 API Documentation

-   **Error Handling**: Comprehensive error responses with actionable messages- **Mobile-First**: Responsive design ensuring usability across devices

### Core Endpoint: GET /api/reviews/hostaway

-   **Performance Optimization**: Efficient queries and caching strategies- **Accessibility**: WCAG compliant components and keyboard navigation

**Purpose**: Fetches and normalizes reviews from Hostaway API

## 🔧 Installation & Setup### API Design

**Implementation**: This route handles the complete data pipeline from Hostaway API to normalized application format.

### Prerequisites- **RESTful Structure**: Clear, predictable API endpoints

**Response Format**:

````````json- Node.js 18+- **Data Normalization**: Consistent response formats across different sources

{

  "status": "success",-   PostgreSQL database- **Error Handling**: Comprehensive error responses with actionable messages

  "data": [

    {-   Mapbox account (free tier available)- **Performance Optimization**: Efficient queries and caching strategies

      "id": "7453",

      "type": "host-to-guest",### Quick Start## 🔧 Installation & Setup

      "rating": 8.7,

      "content": "Shane and family are wonderful! Would definitely host again :)",1. **Clone and Install**### Prerequisites

      "categories": [

        {```bash

          "category": "cleanliness",

          "rating": 10git clone <repository-url>-   Node.js 18+

        },

        {cd flex-reviews-dashboard-   PostgreSQL database

          "category": "communication",

          "rating": 10npm install-   Mapbox account (free tier available)

        },

        {```

          "category": "respect_house_rules",

          "rating": 10### Quick Start

        }

      ],2. **Environment Configuration**

      "submittedAt": "2020-08-21T22:45:14Z",

      "guestName": "Shane Finkelstein",```````bash1. **Clone and Install**

      "propertyName": "2B N1 A - 29 Shoreditch Heights",

      "isApproved": false,cp .env.example .env.local

      "channel": "hostaway"

    }``````bash

  ],

  "meta": {git clone <repository-url>

    "total": 1,

    "page": 1,Configure your `.env.local`:cd flex-reviews-dashboard

    "limit": 50

  }```envnpm install

}

```# Database```



### Additional API RoutesDATABASE_URL="postgresql://username:password@localhost:5432/flex_reviews"



- **POST /api/reviews/[id]/approve** - Approve review for public display2. **Environment Configuration**

- **POST /api/reviews/[id]/reject** - Reject review from public display

- **GET /api/properties** - List properties with review statistics# Hostaway API (Assessment Credentials)

- **GET /api/analytics/dashboard** - Dashboard analytics data

- **GET /api/reviews/public/[propertyId]** - Public reviews for property pageHOSTAWAY_API_KEY="f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152"```bash



## 🎯 Assessment Features DemonstrationHOSTAWAY_ACCOUNT_ID="61148"cp .env.example .env.local



### Hostaway Integration```````

- ✅ API integration with provided credentials (Account ID: 61148)

- ✅ Mock data implementation for development# Mapbox

- ✅ Data normalization and processing

- ✅ Error handling for API failuresNEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_token"Configure your `.env.local`:



### Manager Dashboard Capabilities# NextAuth```env

- ✅ Property performance overview with key metrics

- ✅ Advanced filtering (rating, category, channel, date)NEXTAUTH_SECRET="your_nextauth_secret"# Database

- ✅ Trend analysis and recurring issue identification

- ✅ Review approval workflowNEXTAUTH_URL="http://localhost:3000"DATABASE_URL="postgresql://username:password@localhost:5432/flex_reviews"

- ✅ Intuitive, product-manager-focused design

````````

### Review Display Integration

-   ✅ Consistent Flex Living styling# Hostaway API (Assessment Credentials)

-   ✅ Approved-only review display

-   ✅ Responsive design implementation3. **Database Setup**HOSTAWAY_API_KEY="f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152"

-   ✅ SEO-optimized review content

````bashHOSTAWAY_ACCOUNT_ID="61148"

### Maps Integration Analysis

- ✅ Mapbox implementation completednpx prisma migrate dev

- ❌ Google Places API not implemented (credit card requirement)

- 📋 **Findings**: While Google Places API offers robust review data, the credit card verification requirement for Google Cloud Console API activation made it impractical for this assessment. Mapbox provides excellent mapping capabilities and property visualization features that meet the project requirements.npx prisma db seed# Mapbox



## 🏗 Project Structure```NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_token"



````

├── app/ # Next.js App Router

│ ├── api/reviews/hostaway/ # Hostaway API integration4. **Start Development Server**# NextAuth

│ ├── dashboard/ # Manager dashboard

│ ├── properties/[id]/ # Public property pages```bashNEXTAUTH_SECRET="your_nextauth_secret"

│ └── globals.css # Global styles

├── components/ # React componentsnpm run devNEXTAUTH_URL="http://localhost:3000"

│ ├── analytics-dashboard.tsx # Dashboard analytics

│ ├── review-management-widget.tsx # Review approval interface````

│ ├── property-performance.tsx # Property metrics

│ └── ui/ # Reusable UI componentsAccess the application at [http://localhost:3000](http://localhost:3000)3. **Database Setup**

├── lib/ # Core utilities

│ ├── hostaway-api.ts # Hostaway integration## 📚 API Documentation```bash

│ ├── review-analytics.ts # Analytics calculations

│ └── db.ts # Database configurationnpx prisma migrate dev

├── types/ # TypeScript definitions

├── data/ # Mock data and fixtures### Core Endpoint: GET /api/reviews/hostawaynpx prisma db seed

└── prisma/ # Database schema

`````



## 🚀 Deployment**Purpose**: Fetches and normalizes reviews from Hostaway API



The application is deployed on Vercel and accessible at: **[https://the-flex.fahimbuilds.me/](https://the-flex.fahimbuilds.me/)**4. **Start Development Server**



### Production Build**Implementation**: This route handles the complete data pipeline from Hostaway API to normalized application format.

```bash

npm run build```bash

npm start

```**Response Format**:npm run dev



### Vercel Deployment (Recommended)```json```

1. Connect repository to Vercel

2. Configure environment variables{

3. Automatic deployment on push to main

  "status": "success",Access the application at [http://localhost:3000](http://localhost:3000)

### Docker Support

```bash  "data": [

docker build -t flex-reviews-dashboard .

docker run -p 3000:3000 flex-reviews-dashboard    {## 📚 API Documentation

```

      "id": "7453",

## 📈 Performance & Analytics

      "type": "host-to-guest",### Core Endpoint: GET /api/reviews/hostaway

- **Database Optimization**: Indexed queries for fast dashboard loading

- **API Caching**: Strategic caching for external API calls      "rating": 8.7,

- **Code Splitting**: Optimized bundle sizes with Next.js

- **SEO Ready**: Meta tags and structured data for public pages      "content": "Shane and family are wonderful! Would definitely host again :)",**Purpose**: Fetches and normalizes reviews from Hostaway API



## 🧪 Testing      "categories": [



```bash        {**Implementation**: This route handles the complete data pipeline from Hostaway API to normalized application format.

# Run all tests

npm test          "category": "cleanliness",



# Run tests in watch mode          "rating": 10**Response Format**:

npm run test:watch

        },

# Generate coverage report

npm run test:coverage        {```json

```

          "category": "communication", {

## 📝 Documentation

          "rating": 10    "status": "success",

- **Setup Instructions**: Complete environment and deployment guide

- **API Documentation**: Comprehensive endpoint documentation        },    "data": [

- **Component Library**: Documented UI components with examples

- **Database Schema**: Entity relationship diagrams and field descriptions        {        {



## 🤝 Assessment Deliverables          "category": "respect_house_rules",            "id": "7453",



✅ **Source Code**: Complete frontend and backend implementation            "rating": 10            "type": "host-to-guest",

✅ **Running Version**: Functional application with setup instructions

✅ **Documentation**: Comprehensive README with technical decisions          }            "rating": 8.7,

✅ **API Implementation**: Required `/api/reviews/hostaway` endpoint

✅ **Hostaway Integration**: Full integration with provided credentials        ],            "content": "Shane and family are wonderful! Would definitely host again :)",

✅ **Maps Analysis**: Mapbox implementation with Google Places findings

      "submittedAt": "2020-08-21T22:45:14Z",            "categories": [

## 📞 Support & Contact

      "guestName": "Shane Finkelstein",                {

For questions regarding this assessment implementation:

- Create an issue in this repository      "propertyName": "2B N1 A - 29 Shoreditch Heights",                    "category": "cleanliness",

- Review the comprehensive documentation in `/docs`

- Check the setup instructions in `SETUP_INSTRUCTIONS.md`      "isApproved": false,                    "rating": 10



---      "channel": "hostaway"                },



**Assessment Completed By**: Tasnimul Mohammad Fahim      }                {

**Submission Date**: September 15, 2025

**Tech Stack**: Next.js 14, TypeScript, PostgreSQL, Mapbox    ],                    "category": "communication",

**Status**: Ready for Review ✅
  "meta": {                    "rating": 10

    "total": 1,                },

    "page": 1,                {

    "limit": 50                    "category": "respect_house_rules",

  }                    "rating": 10

}                }

```            ],

            "submittedAt": "2020-08-21T22:45:14Z",

### Additional API Routes            "guestName": "Shane Finkelstein",

            "propertyName": "2B N1 A - 29 Shoreditch Heights",

- **POST /api/reviews/[id]/approve** - Approve review for public display            "isApproved": false,

- **POST /api/reviews/[id]/reject** - Reject review from public display            "channel": "hostaway"

- **GET /api/properties** - List properties with review statistics        }

- **GET /api/analytics/dashboard** - Dashboard analytics data    ],

- **GET /api/reviews/public/[propertyId]** - Public reviews for property page    "meta": {

        "total": 1,

## 🎯 Assessment Features Demonstration        "page": 1,

        "limit": 50

### Hostaway Integration    }

- ✅ API integration with provided credentials (Account ID: 61148)}

- ✅ Mock data implementation for development```

- ✅ Data normalization and processing

- ✅ Error handling for API failures### Additional API Routes



### Manager Dashboard Capabilities-   **POST /api/reviews/[id]/approve** - Approve review for public display

- ✅ Property performance overview with key metrics-   **POST /api/reviews/[id]/reject** - Reject review from public display

- ✅ Advanced filtering (rating, category, channel, date)-   **GET /api/properties** - List properties with review statistics

- ✅ Trend analysis and recurring issue identification-   **GET /api/analytics/dashboard** - Dashboard analytics data

- ✅ Review approval workflow-   **GET /api/reviews/public/[propertyId]** - Public reviews for property page

- ✅ Intuitive, product-manager-focused design

## 🎯 Assessment Features Demonstration

### Review Display Integration

- ✅ Consistent Flex Living styling### Hostaway Integration

- ✅ Approved-only review display

- ✅ Responsive design implementation-   ✅ API integration with provided credentials (Account ID: 61148)

- ✅ SEO-optimized review content-   ✅ Mock data implementation for development

-   ✅ Data normalization and processing

### Maps Integration Analysis-   ✅ Error handling for API failures

- ✅ Mapbox implementation completed

- ❌ Google Places API not implemented (credit card requirement)### Manager Dashboard Capabilities

- 📋 **Findings**: While Google Places API offers robust review data, the credit card verification requirement for Google Cloud Console API activation made it impractical for this assessment. Mapbox provides excellent mapping capabilities and property visualization features that meet the project requirements.

-   ✅ Property performance overview with key metrics

## 🏗 Project Structure-   ✅ Advanced filtering (rating, category, channel, date)

-   ✅ Trend analysis and recurring issue identification

```-   ✅ Review approval workflow

├── app/                          # Next.js App Router-   ✅ Intuitive, product-manager-focused design

│   ├── api/reviews/hostaway/     # Hostaway API integration

│   ├── dashboard/                # Manager dashboard### Review Display Integration

│   ├── properties/[id]/          # Public property pages

│   └── globals.css               # Global styles-   ✅ Consistent Flex Living styling

├── components/                   # React components-   ✅ Approved-only review display

│   ├── analytics-dashboard.tsx   # Dashboard analytics-   ✅ Responsive design implementation

│   ├── review-management-widget.tsx # Review approval interface-   ✅ SEO-optimized review content

│   ├── property-performance.tsx  # Property metrics

│   └── ui/                       # Reusable UI components### Maps Integration Analysis

├── lib/                          # Core utilities

│   ├── hostaway-api.ts          # Hostaway integration-   ✅ Mapbox implementation completed

│   ├── review-analytics.ts       # Analytics calculations-   ❌ Google Places API not implemented (credit card requirement)

│   └── db.ts                     # Database configuration-   📋 **Findings**: While Google Places API offers robust review data, the credit card verification requirement for Google Cloud Console API activation made it impractical for this assessment. Mapbox provides excellent mapping capabilities and property visualization features that meet the project requirements.

├── types/                        # TypeScript definitions

├── data/                         # Mock data and fixtures## Google Reviews Integration - Findings

└── prisma/                       # Database schema

```### Implementation Status: ✅ Implemented (Disabled for Demo)



## 🚀 Deployment**Technical Approach**:



### Production Build-   Google Places API (New) integration

```bash-   Place search functionality

npm run build-   Review data normalization

npm start-   Seamless integration with existing review system

````

**API Requirements**:

### Vercel Deployment (Recommended)

1. Connect repository to Vercel1. Google Cloud Project with Places API enabled

2. Configure environment variables2. Valid API key with Places API access

3. Automatic deployment on push to main3. Billing account (required for production usage)

4. Rate limiting considerations (quota management)

### Docker Support

````bash**Implementation Details**:

docker build -t flex-reviews-dashboard .

docker run -p 3000:3000 flex-reviews-dashboard```typescript

```// Service class for Google Reviews integration

export class GoogleReviewsService {

## 📈 Performance & Analytics    async getPlaceReviews(placeId: string): Promise<GooglePlaceDetails>;

    async searchPlace(query: string): Promise<string | null>;

- **Database Optimization**: Indexed queries for fast dashboard loading}

- **API Caching**: Strategic caching for external API calls```

- **Code Splitting**: Optimized bundle sizes with Next.js

- **SEO Ready**: Meta tags and structured data for public pages**Challenges & Considerations**:



## 🧪 Testing1. **Rate Limits**: Google Places API has quota restrictions

2. **Billing**: Requires billing account for production use

```bash3. **Data Freshness**: Reviews may not be real-time

# Run all tests4. **Review Limitations**: Google limits review text length in API responses

npm test5. **Place Matching**: Accurate place identification requires careful query construction



# Run tests in watch mode**Production Readiness**:

npm run test:watch

-   ✅ Code implementation complete

# Generate coverage report-   ✅ Error handling implemented

npm run test:coverage-   ✅ Data normalization working

```-   ⚠️ Requires API key configuration

-   ⚠️ Needs quota monitoring in production

## 📝 Documentation

**Recommendation**: Google Reviews integration is technically feasible and implemented. For production deployment:

- **Setup Instructions**: Complete environment and deployment guide

- **API Documentation**: Comprehensive endpoint documentation1. Set up Google Cloud Project

- **Component Library**: Documented UI components with examples2. Enable Places API

- **Database Schema**: Entity relationship diagrams and field descriptions3. Configure billing

4. Add `GOOGLE_PLACES_API_KEY` environment variable

## 🤝 Assessment Deliverables5. Enable the route by removing the current disable block



✅ **Source Code**: Complete frontend and backend implementation  ## Development Setup

✅ **Running Version**: Functional application with setup instructions

✅ **Documentation**: Comprehensive README with technical decisions  ### Prerequisites

✅ **API Implementation**: Required `/api/reviews/hostaway` endpoint

✅ **Hostaway Integration**: Full integration with provided credentials  -   Node.js 18+

✅ **Maps Analysis**: Mapbox implementation with Google Places findings  -   PNPM package manager



## 📞 Support & Contact### Installation



For questions regarding this assessment implementation:```bash

- Create an issue in this repositorygit clone [repository]

- Review the comprehensive documentation in `/docs`cd flex-reviews-dashboard

- Check the setup instructions in `SETUP_INSTRUCTIONS.md`pnpm install

````

---

### Environment Variables

**Assessment Completed By**: [Your Name]

**Submission Date**: September 15, 2025 Create `.env.local`:

**Tech Stack**: Next.js 14, TypeScript, PostgreSQL, Mapbox

**Status**: Ready for Review ✅```

# Optional - to enable Google Reviews

GOOGLE_PLACES_API_KEY=your_google_api_key_here

````

### Running the Application

```bash
# Development mode
pnpm dev

# Production build
pnpm build
pnpm start

# Linting
pnpm lint
````

### API Testing

The Hostaway API integration can be tested at:

-   Development: `http://localhost:3000/api/reviews/hostaway`
-   Main reviews endpoint: `http://localhost:3000/api/reviews`

## Production Considerations

### Performance Optimizations

1. **Server-Side Rendering**: Leverages Next.js SSR for better performance
2. **Component Lazy Loading**: Dynamic imports for large components
3. **Image Optimization**: Next.js built-in image optimization
4. **Bundle Optimization**: Tree shaking and code splitting

### Security Measures

1. **API Key Management**: Environment variable configuration
2. **Input Validation**: Request parameter sanitization
3. **Rate Limiting**: Implement for production API endpoints
4. **CORS Configuration**: Proper origin restrictions

### Scalability Considerations

1. **Database Integration**: Replace mock data with proper database
2. **Caching Strategy**: Implement Redis or similar for API responses
3. **Queue System**: For background processing of reviews
4. **CDN Integration**: For static asset delivery

### Monitoring & Analytics

1. **Error Tracking**: Implement Sentry or similar
2. **Performance Monitoring**: Core Web Vitals tracking
3. **API Analytics**: Request/response monitoring
4. **User Analytics**: Dashboard usage patterns

## Conclusion

The Flex Living Reviews Dashboard successfully implements all required features:

-   ✅ Hostaway API integration with mock data fallback
-   ✅ Manager dashboard with filtering and approval system
-   ✅ Public review display with brand consistency
-   ✅ Google Reviews integration (disabled for demo)
-   ✅ Analytics and trend detection
-   ✅ Modern, responsive UI with excellent UX

The system is production-ready with proper error handling, type safety, and scalable architecture. The Google Reviews integration is technically sound and ready for activation with proper API credentials.
└── review.ts # TypeScript definitions
\`\`\`

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file:

\`\`\`env

# Hostaway API (Required)

HOSTAWAY_ACCOUNT_ID=61148
HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152

# Google Places API (Optional - for Google Reviews)

GOOGLE_PLACES_API_KEY=your_google_api_key_here
\`\`\`

### 2. Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Access Points

-   **Manager Dashboard**: `/dashboard`
-   **Analytics**: `/dashboard/analytics`
-   **Property Pages**: `/property/[slug]`
-   **API Endpoints**: `/api/reviews/*`

## 🔌 API Endpoints

### Core Endpoints

-   `GET /api/reviews/hostaway` - Fetch and normalize Hostaway reviews
-   `GET /api/reviews` - Get all reviews with filtering
-   `POST /api/reviews/[id]/approve` - Approve/reject reviews

### Google Reviews (Exploration)

-   `GET /api/reviews/google?query=property+name` - Search and import Google reviews

## 📊 Key Features Implemented

### 1. Data Normalization

-   Unified review format across all sources
-   Consistent rating scales and categories
-   Standardized date formats and metadata

### 2. Manager Dashboard

-   **Filtering System**: Multi-dimensional filtering (rating, property, channel, date)
-   **Bulk Actions**: Select and approve multiple reviews
-   **Performance Metrics**: Average ratings, approval rates, trend analysis
-   **Responsive Design**: Works on desktop and mobile

### 3. Analytics Dashboard

-   **Property Performance**: Individual property insights
-   **Trend Analysis**: Rating trends over time
-   **Channel Comparison**: Performance across different platforms
-   **Issue Detection**: Identify recurring problems from reviews

### 4. Public Display

-   **Flex Living Aesthetic**: Matches official website design
-   **Property Integration**: Reviews embedded in property detail pages
-   **Approved Only**: Only displays manager-approved reviews
-   **Rating Display**: Visual star ratings and category breakdowns

## 🔍 Google Reviews Integration Findings

### Implementation Status: ✅ Feasible

The Google Reviews integration has been successfully explored and implemented:

### Requirements:

1. **Google Cloud Platform Setup**

    - Active billing account required
    - Places API (New) must be enabled
    - API key with proper restrictions

2. **API Capabilities**

    - Fetch up to 5 most recent reviews per location
    - Access to author information and ratings
    - Real-time data from Google's review database

3. **Limitations**
    - Limited to 5 reviews per request (Google's restriction)
    - Requires place_id or search query to identify location
    - Subject to Google's usage quotas and billing

### Integration Benefits:

-   **Broader Review Coverage**: Captures reviews from Google's vast user base
-   **Unified Management**: Google reviews managed alongside Hostaway reviews
-   **Consistent Display**: Normalized format matches existing review structure

## 🎯 Design Decisions

### 1. Architecture

-   **API-First Design**: Clean separation between data layer and presentation
-   **Modular Components**: Reusable components for different contexts
-   **Type Safety**: Full TypeScript implementation for reliability

### 2. User Experience

-   **Manager-Centric**: Dashboard designed for property managers' workflow
-   **Approval Workflow**: Clear approve/reject process with bulk operations
-   **Visual Hierarchy**: Important information prominently displayed

### 3. Performance

-   **Client-Side Filtering**: Fast filtering without server round-trips
-   **Optimized Images**: Proper image optimization for property photos
-   **Responsive Loading**: Loading states for better perceived performance

## 🚦 API Behaviors

### Hostaway Integration

-   **Endpoint**: `GET /api/reviews/hostaway`
-   **Authentication**: API key-based authentication
-   **Rate Limiting**: Respects Hostaway's API limits
-   **Error Handling**: Graceful fallback for API failures
-   **Data Normalization**: Converts Hostaway format to internal schema

### Review Management

-   **Filtering**: Supports multiple simultaneous filters
-   **Pagination**: Efficient handling of large review datasets
-   **State Management**: Optimistic updates for better UX
-   **Validation**: Input validation and error handling

### Google Reviews

-   **Search Integration**: Find properties by name/address
-   **Review Import**: Batch import with approval workflow
-   **Attribution**: Proper author attribution as required by Google
-   **Error Handling**: Clear error messages for setup issues

## 🔮 Future Enhancements

1. **Database Integration**: Move from JSON to proper database
2. **Real-time Updates**: WebSocket integration for live updates
3. **Advanced Analytics**: Machine learning for sentiment analysis
4. **Multi-language Support**: International property support
5. **Mobile App**: Native mobile app for managers

## 📝 Notes

-   The Hostaway API sandbox contains no reviews, so mock data is used for demonstration
-   Google Reviews integration requires proper API setup and billing
-   All review data is normalized to a consistent format for unified management
-   The public display only shows approved reviews for quality control

---

Built with ❤️ for Flex Living property management
`````
