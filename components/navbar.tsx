"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">superU</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#use-cases" className="text-gray-700 hover:text-blue-600 transition-colors">
              Use Cases
            </Link>
            <Link href="#voice-demo" className="text-gray-700 hover:text-blue-600 transition-colors">
              superU in action
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#results" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonial
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/demo"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-inner">
          <div className="space-y-3">
            <Link href="#features" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="#use-cases" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              Use Cases
            </Link>
            <Link href="#voice-demo" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              superU in action
            </Link>
            <Link href="#how-it-works" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              How It Works
            </Link>
            <Link href="#results" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              Testimonial
            </Link>
            <Link href="#faq" className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>
              FAQ
            </Link>
            <Link href="/demo" className="block py-2 text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
              Book Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
