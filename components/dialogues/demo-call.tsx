"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Phone, Mail, User, Link, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import IIcon from "@/components/ui/i-icon-comp"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DemoCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  phoneNumber: string
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTestAgent: () => void
  countries: Record<string, any>[]
  selectedCountry: Record<string, any>
  setSelectedCountry: (country: Record<string, any>) => void
  demoCallIsSubmitting: boolean
  setDemoCallIsSubmitting: (isSubmitting: boolean) => void
  demoCallName: string
  setDemoCallName: (name: string) => void
  demoCallEmail: string
  setDemoCallEmail: (email: string) => void
  demoCallWebsite: string
  setDemoCallWebsite: (website: string) => void
}
export function DemoCallDialog({
  open,
  onOpenChange,
  phoneNumber,
  onPhoneNumberChange,
  countries,
  selectedCountry,
  setSelectedCountry,
  handleTestAgent,
  demoCallIsSubmitting,
  setDemoCallIsSubmitting,
  demoCallName,
  setDemoCallName,
  demoCallEmail,
  setDemoCallEmail,
  demoCallWebsite,
  setDemoCallWebsite,
}: DemoCallDialogProps) {

  const handleSubmit = () => {
    setDemoCallIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      handleTestAgent()
      setDemoCallIsSubmitting(false)
    }, 1000)
  }

  const isPhoneValid = phoneNumber.length === 10
  const isNameValid = demoCallName.length > 0
  // email validation
  const isEmailValid = demoCallEmail.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoCallEmail)
  // const isWebsiteValid = demoCallWebsite.length > 0 && /^https?:\/\/[^\s]+$/.test(demoCallWebsite)
  const isWebsiteValid = demoCallWebsite.length > 0
  const isFormValid = isPhoneValid && isNameValid

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white rounded-xl shadow-2xl">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold">Try a Demo Call</DialogTitle>
            <DialogDescription className="text-blue-100 opacity-90">
              You'll receive a call from our AI assistant in seconds
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="p-6 space-y-4 md:w-1/2">
            {/* Phone Number Input - The most important field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="phone-number" className="text-sm font-medium flex items-center gap-2">
                  Your Phone Number <span className="text-red-500">*</span>
                  <IIcon text="Enter your phone number to receive a test call from the AI agent" />
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedCountry.code}
                  onValueChange={(value) => setSelectedCountry(countries.find((c) => c.code === value) || countries[0])}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.dialCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="Your phone number"
                    className={`pl-10 ${!isPhoneValid && phoneNumber ? "border-red-300" : ""}`}
                    value={phoneNumber}
                    onChange={onPhoneNumberChange}
                  />
                </div>
              </div>
              {!isPhoneValid && phoneNumber && (
                <p className="text-sm text-red-500">Please enter a valid 10-digit phone number</p>
              )}
            </div>

            {/* Optional Fields */}
            <div className=" gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full name"
                    className="pl-10"
                    value={demoCallName}
                    onChange={(e) => setDemoCallName(e.target.value)}
                  />
                </div>
                {!isNameValid && demoCallName && (
                <p className="text-sm text-red-500">Please enter your name</p>
              )}
              </div>

              {/* Email Input */}
              {/* <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={demoCallEmail}
                    onChange={(e) => setDemoCallEmail(e.target.value)}
                  />
                </div>
                {!isEmailValid && demoCallEmail && (
                <p className="text-sm text-red-500">Please enter a valid email address</p>
              )}
              </div> */}
            </div>

            {/* Website Input */}
            {/* <div className="space-y-2">
              <Label htmlFor="company-website" className="text-sm font-medium">
                Company Website or Google Maps Link
              </Label>
              <div className="relative">
                <Link className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="company-website"
                  type="text"
                  placeholder="https://yourcompany.com"
                  className="pl-10"
                  value={demoCallWebsite}
                  onChange={(e) => setDemoCallWebsite(e.target.value)}
                />
              </div>
              {!isWebsiteValid && demoCallWebsite && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-red-500">Please enter a valid website or Google Maps link</p>
                  <p className="text-sm text-red-500">Example: https://yourcompany.com or https://maps.app.goo.gl/1234567890</p>
                </div>
              )}
            </div> */}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                Our AI assistant will call you within seconds of clicking "Call Now"
              </p>
            </div>
            <DialogFooter className="p-6 pt-0 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!isFormValid || demoCallIsSubmitting}
            onClick={handleSubmit}
          >
            {demoCallIsSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </span>
            ) : (
              "Call Now"
            )}
          </Button>
          </DialogFooter>
          </div>

          <div className="p-6 space-y-4 md:w-1/2">
            <span className="text-sm font-medium">This Demo call is about a property inquiry</span>
            <img src="/images/democall-image.png" alt="testimonial" width={400} height={400} />
          </div>
          
        </div>


      </DialogContent>
    </Dialog>
  )
}

