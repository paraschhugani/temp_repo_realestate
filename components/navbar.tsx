"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import SolutionsDropdown from "./solutions-dropdown"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { UserButton } from "@clerk/clerk-react"
import UserAvatar from "@/components/user-avatar"
import BuildTimer from "@/components/build-timer"
import { Dropdown } from "react-day-picker"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
export default function Navbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50 Navbar-all-pages">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.prod.website-files.com/67a1abdaaf835294123e58bc/67a1b2a52838859820c21811_wordmark%20white-p-500.png"
              alt="Superu Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <SolutionsDropdown /> */}

            {/* <Link href="/integration" className="text-gray-200 hover:text-blue-400 transition-colors">
              Integration
            </Link> */}

            

            

            <Link href="#HIW" className="text-gray-200 hover:text-blue-400 transition-colors">
              How it works
            </Link>

            <Link href="#pricing" className="text-gray-200 hover:text-blue-400 transition-colors">
              Pricing
            </Link>

            <Link href="#FAQ" className="text-gray-200 hover:text-blue-400 transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Button */}
          <div className=" flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Need help <ChevronDown className="w-4 h-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => window.open("https://cal.com/superu/demo-setup-30min", "_blank")}>Book a demo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.$crisp.push(["do", "chat:open"])}>Chat with us</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SignedIn>
              <UserAvatar />
            </SignedIn>
            <SignedOut>
              <Link href="/launch/spa-and-salon-appointment-scheduling/form" className="btn-primary">
                Start Free Now
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black py-2 px-4 shadow-inner">
          <div className="space-y-3">
            <SolutionsDropdown />

            <Link href="/integration" className="block py-2 text-gray-200" onClick={() => setIsOpen(false)}>
              Integration
            </Link>

            <Link href="/pricing" className="block py-2 text-gray-200" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>

            <Link href="/launch/spa-and-salon-appointment-scheduling/form" className="block py-2 text-blue-400 font-medium" onClick={() => setIsOpen(false)}>
              Start Free Now
            </Link>
          </div>
        </div>
      )}
      <BuildTimer />
    </nav>
  )
}

