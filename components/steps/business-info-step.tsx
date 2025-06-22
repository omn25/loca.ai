"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const MOCK_CITIES = [
  "Ajax",
  "Aurora",
  "Brampton",
  "Burlington",
  "Hamilton",
  "Markham",
  "Mississauga",
  "Newmarket",
  "Oakville",
  "Oshawa",
  "Ottawa",
  "Pickering",
  "Richmond Hill",
  "Toronto",
  "Vaughan",
  "Whitby",
  "Barrie",
  "Guelph",
  "Kitchener",
  "London",
  "Windsor",
  "Waterloo",
  "Kingston",
  "Scarborough",
  "Etobicoke",
  "York",
  "East York",
  "North York",
  "Scarborough",
]
const MOCK_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
]

interface BusinessInfoStepProps {
  onNext: (data: any) => void
}

export function BusinessInfoStep({ onNext }: BusinessInfoStepProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    streetName: "",
    streetNumber: "",
    city: "",
    province: "",
    postalCode: "",
    website: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullAddress = `${formData.streetNumber} ${formData.streetName}, ${formData.city}, ${formData.province} ${formData.postalCode}`
    onNext({ ...formData, fullAddress })
  }

  const isFormValid =
    formData.businessName &&
    formData.businessType &&
    formData.streetName &&
    formData.streetNumber &&
    formData.city &&
    formData.province &&
    formData.postalCode

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tell us about your business</CardTitle>
        <CardDescription>
          We'll use this information to create personalized ads that resonate with your local customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g., Mike's Pizza Palace"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => setFormData({ ...formData, businessType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="retail">Retail Store</SelectItem>
                  <SelectItem value="service">Service Business</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                  <SelectItem value="beauty">Beauty & Salon</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Briefly describe what makes your business special..."
              rows={3}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium">Business Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="streetName">Street Name *</Label>
                <Input
                  id="streetName"
                  value={formData.streetName}
                  onChange={(e) =>
                    setFormData({ ...formData, streetName: e.target.value })
                  }
                  placeholder="e.g., Main St"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="streetNumber">Street Number *</Label>
                <Input
                  id="streetNumber"
                  value={formData.streetNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, streetNumber: e.target.value })
                  }
                  placeholder="e.g., 123"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
                <Select
                  value={formData.province}
                  onValueChange={(value) =>
                    setFormData({ ...formData, province: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_PROVINCES.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  placeholder="e.g., M5V 2T6"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={!isFormValid} className="bg-blue-600 hover:bg-blue-700">
              Next: Select Target Areas
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
