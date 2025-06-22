"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Lightbulb } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  type: "discount" | "freebie" | "bundle" | "service"
  reasoning: string
}

interface OfferGenerationStepProps {
  onNext: (data: Offer[]) => void
  onBack: () => void
  businessData: any
  selectedStreets: string[]
}

export function OfferGenerationStep({ onNext, onBack, businessData, selectedStreets }: OfferGenerationStepProps) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [showReasoning, setShowReasoning] = useState<string | null>(null)

  const generateOffers = async () => {
    setLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock offers based on business type
    const mockOffers: Offer[] = [
      {
        id: "1",
        title: "20% off first order",
        description: "New customers get 20% off their first order",
        type: "discount",
        reasoning:
          "First-time customer discounts have a 73% higher conversion rate for local restaurants and help build initial trust with neighborhood customers.",
      },
      {
        id: "2",
        title: "Free delivery on orders over $25",
        description: "No delivery fees for orders above $25",
        type: "freebie",
        reasoning:
          "Free delivery removes friction and increases average order value by 35% while appealing to convenience-focused local customers.",
      },
      {
        id: "3",
        title: "Buy 2 get 1 free appetizers",
        description: "Perfect for sharing with friends and family",
        type: "bundle",
        reasoning:
          "Bundle offers encourage larger group orders and increase customer lifetime value by promoting social dining experiences.",
      },
      {
        id: "4",
        title: "Free dessert with entree",
        description: "Complimentary dessert with any main course",
        type: "freebie",
        reasoning:
          "Adding value through free items increases perceived value without significantly impacting margins, especially effective for family restaurants.",
      },
    ]

    setOffers(mockOffers)
    setLoading(false)
  }

  useEffect(() => {
    generateOffers()
  }, [businessData, selectedStreets])

  const handleOfferToggle = (offerId: string) => {
    setSelectedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    await generateOffers()
    setRegenerating(false)
    setSelectedOffers([]) 
  }

  const handleNext = () => {
    const selected = offers.filter((offer) => selectedOffers.includes(offer.id))
    onNext(selected)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "discount":
        return "bg-red-100 text-red-800"
      case "freebie":
        return "bg-green-100 text-green-800"
      case "bundle":
        return "bg-blue-100 text-blue-800"
      case "service":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Generated Offers</CardTitle>
        <CardDescription>
          Our AI analyzed competitor ads and local market data to create these high-converting offers for your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing competitor ads and generating personalized offers...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">Select the offers you'd like to use in your campaigns:</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="flex items-center gap-2"
                >
                  {regenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Regenerate
                </Button>
              </div>

              <div className="grid gap-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`border rounded-lg p-4 transition-all ${
                      selectedOffers.includes(offer.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={offer.id}
                        checked={selectedOffers.includes(offer.id)}
                        onCheckedChange={() => handleOfferToggle(offer.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <label htmlFor={offer.id} className="font-medium cursor-pointer">
                            {offer.title}
                          </label>
                          <Badge className={getTypeColor(offer.type)}>{offer.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowReasoning(showReasoning === offer.id ? null : offer.id)}
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
                        >
                          <Lightbulb className="h-4 w-4 mr-1" />
                          {showReasoning === offer.id ? "Hide" : "Show"} AI Reasoning
                        </Button>
                        {showReasoning === offer.id && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-800">
                              <strong>AI Insight:</strong> {offer.reasoning}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-800">
                <strong>{selectedOffers.length}</strong> offers selected. We recommend using 2-3 offers for optimal
                campaign variety.
              </p>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedOffers.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next: Generate Ad Creatives ({selectedOffers.length} offers)
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
