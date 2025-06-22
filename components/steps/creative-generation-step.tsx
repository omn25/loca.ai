"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Eye, ThumbsUp } from "lucide-react"

interface Creative {
  id: string
  headline: string
  description: string
  callToAction: string
  targetStreet: string
  offer: string
  framework: string
}

interface CreativeGenerationStepProps {
  onNext: (data: Creative[]) => void
  onBack: () => void
  businessData: any
  selectedStreets: string[]
  selectedOffers: any[]
}

export function CreativeGenerationStep({
  onNext,
  onBack,
  businessData,
  selectedStreets,
  selectedOffers,
}: CreativeGenerationStepProps) {
  const [creatives, setCreatives] = useState<Creative[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCreatives, setSelectedCreatives] = useState<string[]>([])

  useEffect(() => {
    const generateCreatives = async () => {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_CREATIVE_API_KEY
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_CREATIVE_API_KEY is not configured.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessName: businessData?.businessName,
            businessType: businessData?.businessType,
            businessAddress: businessData?.fullAddress,
            nearbyStreets: selectedStreets,
            custom_offers: selectedOffers,
          }),
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        
        const formattedCreatives = data.map((item: any, index: number) => ({
          id: `${new Date().getTime()}-${index}`,
          headline: item.headline || "Generated Headline",
          description: item.body || "Generated body text.",
          callToAction: item.cta || "Learn More",
          targetStreet: item.street || "Nearby",
          offer: item.offer || "Special Offer",
          framework: item.framework || "AIDA",
        }));

        setCreatives(formattedCreatives)
      } catch (error) {
        console.error("Failed to generate creatives:", error)
        // Optionally, set some error state to show in the UI
      } finally {
        setLoading(false)
      }
    }

    if (businessData && selectedStreets.length > 0 && selectedOffers.length > 0) {
      generateCreatives()
    }
  }, [businessData, selectedStreets, selectedOffers])

  const handleCreativeToggle = (creativeId: string) => {
    setSelectedCreatives((prev) =>
      prev.includes(creativeId) ? prev.filter((id) => id !== creativeId) : [...prev, creativeId],
    )
  }

  const handleNext = () => {
    const selected = creatives.filter((creative) => selectedCreatives.includes(creative.id))
    onNext(selected)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Generated Ad Creatives</CardTitle>
        <CardDescription>
          Our AI has created hyper-localized ad copy using proven copywriting frameworks. Review and select the
          creatives you'd like to use.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center max-w-md">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-6" />
              <h3 className="text-lg font-semibold mb-2">Creating Your Ad Creatives</h3>
              <p className="text-gray-600 mb-4">
                Our AI is analyzing competitor ads, applying copywriting frameworks, and personalizing content for each
                target street...
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>
                    Analyzing {selectedOffers.length} offers across {selectedStreets.length} streets
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
                  <span>Applying AIDA and PAS copywriting frameworks</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
                  <span>Personalizing for local neighborhoods</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Generated {creatives.length} unique ad creatives. Select the ones you'd like to use:
              </p>

              <div className="grid gap-4">
                {creatives.map((creative) => (
                  <div
                    key={creative.id}
                    className={`border rounded-lg p-6 transition-all cursor-pointer relative ${
                      selectedCreatives.includes(creative.id)
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleCreativeToggle(creative.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-medium">
                          {creative.targetStreet}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                          {creative.framework}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <Eye className="h-5 w-5 hover:text-gray-800" />
                        <ThumbsUp className="h-5 w-5 hover:text-gray-800" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-xl text-gray-800">{creative.headline}</h4>
                      <p className="text-gray-600 leading-relaxed">{creative.description}</p>
                      <div className="flex items-end justify-between pt-2">
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Offer:</span> {creative.offer}
                        </p>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
                          onClick={(e) => {
                            e.stopPropagation() 
                            // Add any specific button action here, e.g., redirecting
                          }}
                        >
                          {creative.callToAction}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-800">
                <strong>{selectedCreatives.length}</strong> creatives selected. Each creative will be automatically A/B
                tested to optimize performance.
              </p>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedCreatives.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Launch Campaign ({selectedCreatives.length} creatives)
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
