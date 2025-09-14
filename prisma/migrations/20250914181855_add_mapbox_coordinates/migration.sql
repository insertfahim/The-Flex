-- AlterTable
ALTER TABLE "public"."properties" ADD COLUMN     "address" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "neighborhood" TEXT;
