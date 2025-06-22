"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Lightbulb } from "lucide-react"

interface Offer {
  id: string
  promotionType: string
  offer: string
  validity: string
  code: string
  title?: string
  description?: string
  type?: "discount" | "freebie" | "bundle" | "service"
  reasoning?: string
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
    const apiUrl = process.env.NEXT_PUBLIC_PRODUCTIONURL_API_KEY
    if (!apiUrl) {
      console.error(
        "NEXT_PUBLIC_PRODUCTIONURL_API_KEY environment variable is not configured.",
      )
      setOffers([])
      setLoading(false)
      return
    }

    try {
      const params = new URLSearchParams({
        businessName: businessData?.businessName || "",
        businessDescription: businessData?.description || "",
        businessType: businessData?.businessType || "",
        maxDiscountPercentage: businessData?.maxDiscountPercentage || "",
        minGuaranteeDays: "14",
      })

      const response = await fetch(`${apiUrl}?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      const offersArray = data.response || data // Handle both {response: [...]} and [...] formats
      const offersWithId = offersArray.map((offer: any, index: number) => ({
        ...offer,
        id: `${new Date().getTime()}-${index}`,
        title: offer.offer,
        description: `${offer.promotionType} - Valid until ${offer.validity}${offer.code ? ` - Code: ${offer.code}` : ''}`,
        type: "discount" as const,
        reasoning: `AI-generated offer based on your ${businessData?.businessType} business with ${offer.promotionType} promotion.`,
      }))
      setOffers(offersWithId)
    } catch (error) {
      console.error("Failed to fetch offers:", error)
      setOffers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (businessData) {
      generateOffers()
    }
  }, [businessData])

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
    switch (type.toLowerCase()) {
      case "discount":
        return "bg-red-100 text-red-800"
      case "freebie":
      case "free":
        return "bg-green-100 text-green-800"
      case "bundle":
        return "bg-blue-100 text-blue-800"
      case "service":
        return "bg-purple-100 text-purple-800"
      case "deal":
        return "bg-orange-100 text-orange-800"
      case "offer":
        return "bg-indigo-100 text-indigo-800"
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
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <Checkbox
                          id={offer.id}
                          checked={selectedOffers.includes(offer.id)}
                          onCheckedChange={() => handleOfferToggle(offer.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={offer.id} className="font-medium cursor-pointer">
                            {offer.title}
                          </label>
                          <p className="text-sm text-gray-600 mt-2 mb-3">{offer.description}</p>
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
                      <Badge
                        className={`${getTypeColor(
                          offer.promotionType,
                        )} rounded-lg text-center px-3 py-1.5 text-xs whitespace-normal max-w-[120px] h-fit flex items-center justify-center`}
                      >
                        {offer.promotionType}
                      </Badge>
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
