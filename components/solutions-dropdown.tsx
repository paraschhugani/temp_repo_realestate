"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Heart, Home, Briefcase, Building, Dumbbell, Cloud } from "lucide-react"

const industries = [
  { name: "Health", icon: Heart, description: "Enhance patient care & streamline appointments" },
  { name: "Mortgage", icon: Home, description: "Automate inquiries and loan processing" },
  { name: "Recruitment", icon: Briefcase, description: "Simplify candidate screening and scheduling" },
  { name: "Real-Estate", icon: Building, description: "Improve property inquiries and bookings" },
  { name: "Fitness", icon: Dumbbell, description: "Boost client engagement and retention" },
  { name: "SaaS", icon: Cloud, description: "Enhance customer engagement for SaaS businesses" },
]

export default function SolutionsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-200 hover:text-blue-400 transition-colors"
      >
        Solutions
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg py-2 z-10 transition-all duration-200 ease-in-out">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={`/industry/${industry.name.toLowerCase()}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <industry.icon className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <div className="font-medium">{industry.name}</div>
                  <div className="text-xs text-gray-500">{industry.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

