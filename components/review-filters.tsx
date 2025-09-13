"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import type { ReviewFiltersType } from "@/types/review"

interface ReviewFiltersProps {
  filters: ReviewFiltersType
  onFiltersChange: (filters: ReviewFiltersType) => void
  totalReviews: number
  filteredReviews: number
}

export function ReviewFiltersComponent({
  filters,
  onFiltersChange,
  totalReviews,
  filteredReviews,
}: ReviewFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof ReviewFiltersType, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredReviews} of {totalReviews} reviews
            </span>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Minimum Rating</Label>
              <Select
                value={filters.rating?.toString() || "any"}
                onValueChange={(value) => updateFilter("rating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any rating</SelectItem>
                  <SelectItem value="9">9+ stars</SelectItem>
                  <SelectItem value="8">8+ stars</SelectItem>
                  <SelectItem value="7">7+ stars</SelectItem>
                  <SelectItem value="6">6+ stars</SelectItem>
                  <SelectItem value="5">5+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status || "any"} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Select value={filters.channel || "any"} onValueChange={(value) => updateFilter("channel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any channel</SelectItem>
                  <SelectItem value="hostaway">Hostaway</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing">Property</Label>
              <Input
                id="listing"
                placeholder="Search properties..."
                value={filters.listing || ""}
                onChange={(e) => updateFilter("listing", e.target.value)}
              />
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex flex-wrap gap-2">
                {filters.rating && (
                  <Badge variant="outline" className="gap-1">
                    Rating: {filters.rating}+
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("rating", undefined)} />
                  </Badge>
                )}
                {filters.status && (
                  <Badge variant="outline" className="gap-1">
                    Status: {filters.status}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("status", undefined)} />
                  </Badge>
                )}
                {filters.channel && (
                  <Badge variant="outline" className="gap-1">
                    Channel: {filters.channel}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("channel", undefined)} />
                  </Badge>
                )}
                {filters.listing && (
                  <Badge variant="outline" className="gap-1">
                    Property: {filters.listing}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("listing", undefined)} />
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export { ReviewFiltersComponent as ReviewFilters }
