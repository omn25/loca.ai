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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CampaignsPage() {
  const [wizardData, setWizardData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("wizardData")
    if (data) {
      setWizardData(JSON.parse(data))
    }
  }, [])

  return (
    <DashboardLayout pageTitle="Campaigns">
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
          <CardDescription>
            A list of all campaigns created for{" "}
            {wizardData?.businessData?.businessName || "your business"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {wizardData?.selectedOffers?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name / Offer Title</TableHead>
                  <TableHead>Offer Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wizardData.selectedOffers.map(
                  (offer: {
                    id: string;
                    title: string;
                    type: string;
                    description: string;
                  }) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">
                        {offer.title}
                      </TableCell>
                      <TableCell>{offer.type}</TableCell>
                      <TableCell>{offer.description}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              You haven't created any campaigns yet.
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 