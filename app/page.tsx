"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LandingPage } from "@/components/landpage"
import { SetupWizard } from "@/components/setup-wizard"

function HomeComponent() {
  const searchParams = useSearchParams()
  const startStep = searchParams.get("startStep")

  const [showWizard, setShowWizard] = useState(!!startStep)
  const router = useRouter()

  const handleComplete = (wizardData: any) => {
    localStorage.setItem("wizardData", JSON.stringify(wizardData))
    router.push("/dashboard")
  }

  if (showWizard) {
    return (
      <SetupWizard
        onComplete={handleComplete}
        onBackToLanding={() => setShowWizard(false)}
        initialStep={startStep ? parseInt(startStep, 10) : 1}
      />
    )
  }

  return <LandingPage onGetStarted={() => setShowWizard(true)} />
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  )
} 