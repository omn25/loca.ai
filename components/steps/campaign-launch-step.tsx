"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, Rocket } from "lucide-react"

interface CampaignLaunchStepProps {
  onNext: () => void
  onBack: () => void
  businessData: any
  selectedStreets: string[]
  selectedOffers: any[]
  generatedCreatives: any[]
}

export function CampaignLaunchStep({
  onNext,
  onBack,
  businessData,
  selectedStreets,
  selectedOffers,
  generatedCreatives,
}: CampaignLaunchStepProps) {
  const [launchProgress, setLaunchProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  const launchSteps = [
    "Setting up Facebook Ad Account connection",
    "Creating campaign structure",
    "Uploading ad creatives",
    "Configuring audience targeting",
    "Setting budget and bidding strategy",
    "Launching campaigns",
    "Initializing performance tracking",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          clearInterval(interval)
          return 100
        }

        const newProgress = prev + Math.random() * 15 + 5
        const stepIndex = Math.floor((newProgress / 100) * launchSteps.length)
        setCurrentStep(Math.min(stepIndex, launchSteps.length - 1))

        return Math.min(newProgress, 100)
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleViewDashboard = () => {
    router.push("/dashboard")
    onNext()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-blue-600" />
          Launching Your Campaign
        </CardTitle>
        <CardDescription>
          We're setting up your Facebook ad campaigns with the selected creatives and targeting options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Campaign Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Campaign Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Business:</span>
                <p className="font-medium">{businessData.businessName}</p>
              </div>
              <div>
                <span className="text-gray-600">Target Streets:</span>
                <p className="font-medium">{selectedStreets.length} streets</p>
              </div>
              <div>
                <span className="text-gray-600">Offers:</span>
                <p className="font-medium">{selectedOffers.length} offers</p>
              </div>
              <div>
                <span className="text-gray-600">Ad Creatives:</span>
                <p className="font-medium">{generatedCreatives.length} creatives</p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Launch Progress</h3>
              <span className="text-sm text-gray-600">{Math.round(launchProgress)}%</span>
            </div>

            <Progress value={launchProgress} className="w-full" />

            <div className="space-y-3">
              {launchSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={`text-sm ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {isComplete && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-green-900">Campaign Launched Successfully!</h3>
              </div>
              <p className="text-green-800 text-sm mb-4">
                Your hyper-localized ad campaigns are now live on Facebook. Our AI will continuously monitor and
                optimize performance to maximize your ROI.
              </p>
              <div className="bg-white p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">What happens next:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Campaigns will start delivering within 15-30 minutes</li>
                  <li>• AI optimization begins after 24 hours of data collection</li>
                  <li>• You'll receive daily performance reports via email</li>
                  <li>• Budget adjustments and creative refreshes happen automatically</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} disabled={launchProgress > 0}>
              Back
            </Button>
            <Button onClick={handleViewDashboard} disabled={!isComplete} className="bg-blue-600 hover:bg-blue-700">
              View Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
