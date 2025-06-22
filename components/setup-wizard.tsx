"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BusinessInfoStep } from "./steps/business-info-step"
import { StreetSelectionStep } from "./steps/street-selection-step"
import { OfferGenerationStep } from "./steps/offer-generation-step"
import { CreativeGenerationStep } from "./steps/creative-generation-step"
import { CampaignLaunchStep } from "./steps/campaign-launch-step"
import { Header } from "./header"

interface SetupWizardProps {
  onComplete: (data: any) => void
  onBackToLanding: () => void
  initialStep?: number
}

export function SetupWizard({ onComplete, onBackToLanding, initialStep = 1 }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [businessData, setBusinessData] = useState<any>({})
  const [selectedStreets, setSelectedStreets] = useState<string[]>([])
  const [selectedOffers, setSelectedOffers] = useState<any[]>([])
  const [generatedCreatives, setGeneratedCreatives] = useState<any[]>([])
  const router = useRouter()

  const steps = [
    { id: 1, title: "Business Info", component: BusinessInfoStep },
    { id: 2, title: "Target Areas", component: StreetSelectionStep },
    { id: 3, title: "Offers", component: OfferGenerationStep },
    { id: 4, title: "Creatives", component: CreativeGenerationStep },
    { id: 5, title: "Launch", component: CampaignLaunchStep },
  ]

  const currentStepData = steps.find((step) => step.id === currentStep)
  const CurrentStepComponent = currentStepData?.component

  const handleNext = (data?: any) => {
    if (currentStep === 1) setBusinessData(data)
    if (currentStep === 2) setSelectedStreets(data)
    if (currentStep === 3) setSelectedOffers(data)
    if (currentStep === 4) setGeneratedCreatives(data)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete({
        businessData,
        selectedStreets,
        selectedOffers,
        generatedCreatives,
      })
    }
  }

  const handleBack = () => {
    if (initialStep > 1 && currentStep === initialStep) {
      router.push("/dashboard")
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBackToLanding()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header currentStep={currentStep} totalSteps={5} onBack={handleBack} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{currentStepData?.title}</h1>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {CurrentStepComponent && (
                <CurrentStepComponent
                  onNext={handleNext}
                  onBack={handleBack}
                  businessData={businessData}
                  selectedStreets={selectedStreets}
                  selectedOffers={selectedOffers}
                  generatedCreatives={generatedCreatives}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
