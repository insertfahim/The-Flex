"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Calendar, MapPin, User, MessageSquare, Check, X } from "lucide-react"
import type { NormalizedReview } from "@/types/review"

interface ReviewCardProps {
  review: NormalizedReview
  onApprove: (reviewId: number, approved: boolean, managerNotes?: string) => Promise<boolean>
}

export function ReviewCard({ review, onApprove }: ReviewCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [managerNotes, setManagerNotes] = useState(review.managerNotes || "")
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [pendingAction, setPendingAction] = useState<"approve" | "reject" | null>(null)

  const handleApproval = async (approved: boolean) => {
    setIsApproving(true)
    const success = await onApprove(review.id, approved, managerNotes)
    setIsApproving(false)
    if (success) {
      setShowApprovalDialog(false)
      setPendingAction(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-[#22C55E]/10 text-[#16A34A] border-[#22C55E]/20"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-[#4B5563] border-gray-200"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 bg-white">
      <CardHeader className="pb-3 bg-gradient-to-r from-[#FEF1F7] to-white">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#284E4C]" />
              <span className="font-semibold text-[#020817]">{review.guestName}</span>
              <Badge variant="outline" className="text-xs border-[#284E4C]/20 text-[#284E4C] bg-white">
                {review.channel}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
              <MapPin className="h-3 w-3" />
              <span>{review.listingName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
              <Calendar className="h-3 w-3" />
              <span>
                {review.submittedAt ? new Date(review.submittedAt).toLocaleDateString() : "Date not available"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
            <div className="flex items-center gap-1">
              {renderStars(review.overallRating)}
              <span className="text-sm font-semibold ml-1 text-[#020817]">{review.overallRating}/10</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-[#020817] leading-relaxed">{review.review}</p>
        </div>

        {Object.keys(review.categories).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#020817]">Category Ratings</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between text-sm bg-[#FEF1F7] p-2 rounded-lg">
                  <span className="capitalize font-medium text-[#020817]">{category.replace("_", " ")}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(rating || 0)}
                    <span className="text-xs ml-1 font-semibold text-[#020817]">{rating}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {review.managerNotes && (
          <div className="bg-[#284E4C]/5 p-4 rounded-lg border border-[#284E4C]/10">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-[#284E4C]" />
              <span className="text-sm font-semibold text-[#284E4C]">Manager Notes</span>
            </div>
            <p className="text-sm text-[#020817]">{review.managerNotes}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#22C55E] text-[#16A34A] hover:bg-[#22C55E] hover:text-white bg-transparent"
                onClick={() => {
                  setPendingAction("approve")
                  setShowApprovalDialog(true)
                }}
                disabled={review.isApproved}
              >
                <Check className="h-4 w-4 mr-1" />
                {review.isApproved ? "Approved" : "Approve"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#020817]">
                  {pendingAction === "approve" ? "Approve" : "Reject"} Review
                </DialogTitle>
                <DialogDescription className="text-[#4B5563]">
                  {pendingAction === "approve"
                    ? "This review will be displayed on the public website."
                    : "This review will be hidden from the public website."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes" className="text-[#020817] font-medium">
                    Manager Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any internal notes about this review..."
                    value={managerNotes}
                    onChange={(e) => setManagerNotes(e.target.value)}
                    className="mt-1 border-gray-200 focus:border-[#284E4C]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApprovalDialog(false)} disabled={isApproving}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleApproval(pendingAction === "approve")}
                  disabled={isApproving}
                  className={
                    pendingAction === "approve"
                      ? "bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                >
                  {isApproving ? "Processing..." : pendingAction === "approve" ? "Approve" : "Reject"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
            onClick={() => {
              setPendingAction("reject")
              setShowApprovalDialog(true)
            }}
            disabled={review.status === "rejected"}
          >
            <X className="h-4 w-4 mr-1" />
            {review.status === "rejected" ? "Rejected" : "Reject"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
