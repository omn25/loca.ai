"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Target, Zap, Clock, DollarSign, MapPin, ArrowRight, Quote } from "lucide-react"
import Image from "next/image"

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState("")

  const handleGetStarted = () => {
    // In real app, this would navigate to signup or demo booking
    console.log("Get started clicked with email:", email)
  }

  const handleWatchDemo = () => {
    // In real app, this would open demo video or booking
    console.log("Watch demo clicked")
  }

  const handleScrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="loca.ai Logo" width={32} height={32} />
              <span className="text-xl font-bold text-gray-900">loca.ai</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#pricing"  onClick={handleScrollToPricing} className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <Button variant="outline" onClick={onGetStarted}>
                Demo
              </Button>
              <Button onClick={handleScrollToPricing} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Now serving 500+ local businesses
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Wasting Money on
              <span className="text-blue-600"> Social Media Marketing</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our AI creates and manages adverstisements that actually work for your local business. Get more customers
              from your neighborhood without the guesswork or high costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-80"
                />
                <Button
                  onClick={handleScrollToPricing}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Setup in under 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Social Media Ads Don't Have to Be Time Consuming
              </h2>
              <p className="text-xl text-gray-600">
                Most local businesses struggle with advertising because they lack the time and resources for effective marketing. We make it
                simple and profitable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Old Way (Frustrating)</h3>
                <div className="space-y-4">
                  {[
                    "Spend hours creating and editing videos and generating content ideas",
                    "Guess what ads will work for your local customers",
                    "Waste money on ads that don't bring in customers",
                    "Constantly monitor and adjust campaigns manually",
                    "Compete with big businesses who have marketing teams",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The loca.ai Way (Simple)</h3>
                <div className="space-y-4">
                  {[
                    "Answer a few questions about your business",
                    "Our AI creates ads proven to work in your area",
                    "Get more local customers automatically",
                    "AI manages and optimizes everything for you",
                    "Compete with anyone using smart technology",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Win More Local Customers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI does the heavy lifting so you can focus on running your business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Competitor Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We study what's working for similar businesses in your area and use those insights to create better
                    ads for you.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Written Ad Copy</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI writes compelling ads that speak directly to your local customers, using proven copywriting
                    techniques.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hyper-Local Targeting</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Target specific neighborhoods, streets, and local events to reach customers who are most likely to
                    visit your business.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Set it and forget it. Our AI continuously optimizes your campaigns to get you the best results for
                    your budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Budget Control</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Never overspend again. Our AI adjusts your budget automatically to maximize your return on
                    investment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Insights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get clear, easy-to-understand reports showing exactly how your ads are performing and bringing in
                    customers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get Started in 3 Simple Steps</h2>
              <p className="text-xl text-gray-600">
                No technical knowledge required. We'll have you up and running in minutes.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tell Us About Your Business</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Answer a few simple questions about your business, location, and what makes you special. Takes less
                    than 5 minutes.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Creates Your Campaigns</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our AI analyzes your competition, creates compelling ad copy, and sets up targeted campaigns
                    designed to bring in local customers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Customers Come In</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Your ads go live and start bringing in customers. Our AI continuously optimizes everything to get
                    you the best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Local Businesses Love loca.ai</h2>
              <p className="text-xl text-gray-600">See how we're helping businesses like yours grow</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "loca.ai doubled our online orders in just 3 weeks. The AI really understands our local market and
                    creates ads that actually work."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">MR</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Maria Rodriguez</p>
                      <p className="text-gray-600 text-sm">Owner, Maria's Tacos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "I was spending $500/month on Facebook ads with terrible results. Now I spend $300 and get 3x more
                    customers. This thing is magic!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">DK</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">David Kim</p>
                      <p className="text-gray-600 text-sm">Owner, Kim's Auto Repair</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "Finally, Facebook ads that make sense! The setup was so easy and now I have a steady stream of new
                    clients booking appointments."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">SJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <p className="text-gray-600 text-sm">Owner, Bloom Hair Salon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Local Businesses</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">3.2x</div>
                <div className="text-gray-600">Average ROI Increase</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">$2M+</div>
                <div className="text-gray-600">Ad Spend Managed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">No hidden fees. No long-term contracts. Cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="border-2 border-gray-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$97</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="space-y-4 mb-8 text-left">
                    {[
                      "Up to $1,000 ad spend per month",
                      "AI-generated ad campaigns",
                      "Hyper-local targeting",
                      "Automated optimization",
                      "Basic reporting dashboard",
                      "Email support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Start Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$197</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="space-y-4 mb-8 text-left">
                    {[
                      "Up to $5,000 ad spend per month",
                      "Everything in Starter, plus:",
                      "Advanced competitor analysis",
                      "Multiple campaign types",
                      "Priority support",
                      "Weekly strategy calls",
                      "Custom reporting",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className={`${index === 1 ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={onGetStarted}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                  >
                    Start Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <h3 className="text-3xl font-bold text-gray-900">Scale</h3>
                  <p className="text-gray-600 mb-6">For businesses ready to dominate</p>
                  <div className="text-5xl font-bold text-gray-900 mb-6">
                    $299<span className="text-lg font-normal text-gray-600">/mo</span>
                  </div>
                  <ul className="space-y-4 text-gray-600 text-left mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Dedicated Account Manager</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Advanced Analytics & Reporting</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>A/B Testing & Optimization</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onGetStarted}
                    className="w-full bg-gray-900 hover:bg-gray-800 mt-6"
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Need higher ad spend limits?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Contact us
                </a>{" "}
                for enterprise pricing.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get More Local Customers?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of local businesses already using loca.ai to grow their customer base with smart, automated
              ads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 bg-white"
              />
              <Button
                onClick={handleScrollToPricing}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Get Started
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Setup in 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold">loca.ai</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI-powered ads that actually work for local businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#features" className="block hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="block hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Demo
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Book a Call
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 loca.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
