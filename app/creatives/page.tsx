"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CreativesPage() {
  const [wizardData, setWizardData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("wizardData")
    if (data) {
      setWizardData(JSON.parse(data))
    }
  }, [])

  return (
    <DashboardLayout pageTitle="Creatives">
      <Card>
        <CardHeader>
          <CardTitle>Your Ad Creatives</CardTitle>
          <CardDescription>
            A list of all creatives generated for{" "}
            {wizardData?.businessData?.businessName || "your business"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {wizardData?.generatedCreatives?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {wizardData.generatedCreatives.map(
                (creative: {
                  id: string;
                  headline: string;
                  description: string;
                  targetStreet: string;
                  offer: string;
                }) => (
                  <Card key={creative.id}>
                    <CardHeader>
                      <CardTitle>{creative.headline}</CardTitle>
                      <div className="flex gap-2 pt-2">
                        <Badge variant="outline">
                          {creative.targetStreet}
                        </Badge>
                        <Badge variant="secondary">{creative.offer}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {creative.description}
                      </p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              You haven't generated any creatives yet.
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 