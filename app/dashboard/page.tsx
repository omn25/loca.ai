"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDown,
  ArrowUp,
  BarChart,
  Calendar,
  CheckCircle,
  Eye,
  HelpCircle,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  Plus,
  Settings,
  Wallet,
  Download,
  MoreVertical,
  DollarSign,
  TrendingUp,
  Copy,
  MapPin,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
} from "recharts"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, changeType, icon: Icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground flex items-center">
        {change && (
          <>
            {changeType === "increase" ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`mr-1 ${
                changeType === "increase" ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          </>
        )}
        vs last period
      </p>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [wizardData, setWizardData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("wizardData")
    if (data) {
      setWizardData(JSON.parse(data))
    }
  }, [])

  const pageTitle = (
    <>
      Performance Dashboard
      {wizardData?.businessData?.businessName && (
        <span className="text-base text-muted-foreground ml-2">
          - {wizardData.businessData.businessName}
        </span>
      )}
    </>
  )

  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="gap-1">
        <Download className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Export
        </span>
      </Button>
      <Button variant="outline" size="sm" className="gap-1">
        <Calendar className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Last 30 days
        </span>
      </Button>
    </>
  )

  return (
    <DashboardLayout pageTitle={pageTitle} headerActions={headerActions}>
      <div className="grid gap-4 md:gap-8">
        {/* Waiting for data notification */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-blue-800">
                  Your campaigns are live!
                </h3>
                <p className="text-sm text-blue-700">
                  Performance data may take up to 24 hours to populate. Please
                  check back soon.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatCard title="Total Spend" value="N/A" icon={DollarSign} />
          <StatCard title="Impressions" value="N/A" icon={Eye} />
          <StatCard title="Clicks" value="N/A" icon={TrendingUp} />
          <StatCard title="Conversions" value="N/A" icon={CheckCircle} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spend Over Time</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-80">
              <p className="text-muted-foreground">Data will be shown here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-80">
              <p className="text-muted-foreground">Data will be shown here.</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Campaign Breakdown</CardTitle>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <a href="#">
                View All
                <ArrowUp className="h-4 w-4 rotate-45" />
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            {wizardData?.selectedOffers?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>CVR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wizardData.selectedOffers.map(
                    (offer: { id: string; title: string }) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">
                          {offer.title}
                        </TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Campaign data will appear here once available.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Creatives Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Ad Creatives</CardTitle>
          </CardHeader>
          <CardContent>
            {wizardData?.generatedCreatives?.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wizardData.generatedCreatives.map((creative: { street: string; headline: string; body: string; imageUrl: string }, index: number) => (
                  <Card key={index} className="flex flex-col overflow-hidden rounded-lg">
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={creative.imageUrl || "/placeholder.svg"}
                        alt={`Ad creative for ${creative.street}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>Ad for {creative.street}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 flex-grow">{creative.headline}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{creative.body}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 mt-auto"
                        onClick={() => navigator.clipboard.writeText(`${creative.headline}\n\n${creative.body}`)}
                      >
                        <Copy className="h-4 w-4" />
                        Copy Text
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                 <ImageIcon className="mx-auto h-12 w-12 mb-4" />
                <p>Your generated ad creatives will appear here.</p>
                <p className="text-sm">Complete the setup wizard to generate your first set of ads.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 