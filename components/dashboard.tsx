"use client"

import { useState } from "react"
import { Header } from "./header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Users,
  MapPin,
  Calendar,
  Settings,
} from "lucide-react"

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data - in real app this would come from API
  const metrics = {
    totalSpend: 1250.75,
    impressions: 1200000,
    clicks: 25600,
    conversions: 1500,
    ctr: 2.13,
    cpc: 0.49,
    conversionRate: 5.86,
    roas: 4.2,
  }

  const campaigns = [
    {
      name: "Main Street - 20% Off First Order",
      status: "active",
      spend: 450.25,
      impressions: 450000,
      clicks: 9500,
      conversions: 580,
      ctr: 2.11,
      cpc: 0.47,
    },
    {
      name: "Oak Avenue - Free Delivery",
      status: "active",
      spend: 380.5,
      impressions: 380000,
      clicks: 7800,
      conversions: 420,
      ctr: 2.05,
      cpc: 0.49,
    },
    {
      name: "Elm Street - Buy 2 Get 1 Free",
      status: "active",
      spend: 420.0,
      impressions: 370000,
      clicks: 8300,
      conversions: 500,
      ctr: 2.24,
      cpc: 0.51,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your hyper-localized ad campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 7 days
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalSpend.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +5.2% vs last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(metrics.impressions / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                -1.8% vs last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(metrics.clicks / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +12.3% vs last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(metrics.conversions / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-yellow-600">0.0% vs last period</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="audiences">Audiences</TabsTrigger>
            <TabsTrigger value="creatives">Creatives</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Performance breakdown by campaign and target area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <Badge className="bg-green-100 text-green-800">{campaign.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Spend</span>
                          <p className="font-medium">${campaign.spend}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Impressions</span>
                          <p className="font-medium">{(campaign.impressions / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Clicks</span>
                          <p className="font-medium">{(campaign.clicks / 1000).toFixed(1)}K</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Conversions</span>
                          <p className="font-medium">{campaign.conversions}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">CTR</span>
                          <p className="font-medium">{campaign.ctr}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">CPC</span>
                          <p className="font-medium">${campaign.cpc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audiences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Performance</CardTitle>
                <CardDescription>Performance by target street and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Audience insights will appear here once campaigns have collected sufficient data.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creatives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Creative Performance</CardTitle>
                <CardDescription>A/B test results and creative optimization insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Creative performance data will be available after 24 hours of campaign delivery.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights & Recommendations</CardTitle>
                <CardDescription>Automated optimization suggestions and market insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>AI-powered insights and recommendations will appear as your campaigns gather performance data.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
