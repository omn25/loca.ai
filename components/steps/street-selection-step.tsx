"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

interface StreetSelectionStepProps {
  onNext: (data: string[]) => void
  onBack: () => void
  businessData: any
}

export function StreetSelectionStep({ onNext, onBack, businessData }: StreetSelectionStepProps) {
  const [streets, setStreets] = useState<string[]>([])
  const [selectedStreets, setSelectedStreets] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStreets = async () => {
      if (!businessData?.fullAddress) {
        // Don't fetch if we don't have an address yet
        return
      }

      setLoading(true)
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STREETS_API_KEY
        if (!baseUrl) {
          throw new Error(
            "NEXT_PUBLIC_STREETS_API_KEY environment variable is not configured.",
          )
        }

        const encodedAddress = encodeURIComponent(businessData.fullAddress)
        const apiUrl = `${baseUrl}?address=${encodedAddress}`

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const fetchedStreets = data.nearbyStreets || []

        setStreets(fetchedStreets)
        setSelectedStreets(fetchedStreets)
      } catch (error) {
        console.error("Failed to fetch streets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreets()
  }, [businessData])

  const handleStreetToggle = (street: string) => {
    setSelectedStreets((prev) => (prev.includes(street) ? prev.filter((s) => s !== street) : [...prev, street]))
  }

  const handleNext = () => {
    onNext(selectedStreets)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Your Target Streets</CardTitle>
        <CardDescription>
          Choose the streets where your potential customers live or work. We'll create hyper-localized ads for these
          areas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing your area and finding the best streets...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Found {streets.length} streets in {businessData.location}. We've
                selected them all for you, but you can adjust the selection.
              </p>

              <div className="max-h-96 overflow-y-auto rounded-lg border bg-white">
                {streets.map((street) => (
                  <div
                    key={street}
                    onClick={() => handleStreetToggle(street)}
                    className="flex cursor-pointer items-center justify-between border-b p-4 transition-colors last:border-b-0 hover:bg-blue-50"
                  >
                    <span className="font-medium text-gray-800">
                      {street}
                    </span>
                    <Checkbox
                      checked={selectedStreets.includes(street)}
                      className="pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>{selectedStreets.length}</strong> streets selected. We recommend selecting 5-10 streets for
                optimal campaign performance.
              </p>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedStreets.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next: Generate Offers ({selectedStreets.length} streets)
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
