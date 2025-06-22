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
      // Simulate longer API delay for creative generation
      await new Promise((resolve) => setTimeout(resolve, 4000))

      // Mock creatives combining streets and offers
      const mockCreatives: Creative[] = []

      selectedStreets.slice(0, 3).forEach((street, streetIndex) => {
        selectedOffers.forEach((offer, offerIndex) => {
          mockCreatives.push({
            id: `${streetIndex}-${offerIndex}`,
            headline: `${street} Neighbors: ${offer.title}!`,
            description: `Hey ${street} residents! ${businessData.businessName} is bringing you an exclusive ${offer.description.toLowerCase()}. Perfect for busy weeknights when you want quality food delivered right to your door.`,
            callToAction: "Order Now",
            targetStreet: street,
            offer: offer.title,
            framework: "AIDA (Attention-Interest-Desire-Action)",
          })
        })
      })

      setCreatives(mockCreatives.slice(0, 6)) // Limit to 6 creatives
      setLoading(false)
    }

    generateCreatives()
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
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      selectedCreatives.includes(creative.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleCreativeToggle(creative.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {creative.targetStreet}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {creative.framework}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={selectedCreatives.includes(creative.id) ? "default" : "ghost"}
                          size="sm"
                          className="h-8 px-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{creative.headline}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{creative.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">Offer: {creative.offer}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          {creative.callToAction}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-purple-800">
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
