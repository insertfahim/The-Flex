-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."ReviewChannel" AS ENUM ('HOSTAWAY', 'GOOGLE', 'AIRBNB', 'BOOKING', 'DIRECT');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "status" "public"."PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT,
    "overallRating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "channel" "public"."ReviewChannel" NOT NULL,
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "managerNotes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cleanliness" DOUBLE PRECISION,
    "communication" DOUBLE PRECISION,
    "location" DOUBLE PRECISION,
    "checkin" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "value" DOUBLE PRECISION,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."property_stats" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "revenue" INTEGER NOT NULL,
    "occupancy" DOUBLE PRECISION NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "public"."properties"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "property_stats_propertyId_month_key" ON "public"."property_stats"("propertyId", "month");

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."property_stats" ADD CONSTRAINT "property_stats_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
