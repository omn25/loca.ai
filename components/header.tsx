"use client"

import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  currentStep?: number
  totalSteps?: number
  onBack?: () => void
}

export function Header({ currentStep, totalSteps, onBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Image src="/logo.png" alt="loca.ai Logo" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900">loca.ai</span>
          </div>

          {currentStep && totalSteps && (
            <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
              <span>Setup Wizard</span>
              <span className="text-blue-600 font-medium">
                {currentStep}/{totalSteps}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
