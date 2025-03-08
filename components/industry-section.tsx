import Link from "next/link"
import { ArrowRight, Heart, Home, Briefcase, Building, Dumbbell } from "lucide-react"
import { getAllIndustries, getIndustryData } from "@/lib/use-case-data"

const industryIcons = {
  health: Heart,
  mortgage: Home,
  recruitment: Briefcase,
  "real-estate": Building,
  fitness: Dumbbell,
}

export default function IndustrySection() {
  const industries = getAllIndustries()

  return (
    <section className="section-padding bg-gray-50" id="industries">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Industry Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how Superu transforms industries through AI-powered calling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((industry) => {
            const industryData = getIndustryData(industry)
            if (!industryData) return null

            const Icon = industryIcons[industry as keyof typeof industryIcons] || Building

            return (
              <Link
                key={industry}
                href={`/industry/${industry}`}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
              >
                <div
                  className={`${industryData.color} bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {industryData.title}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>
                  <p className="text-gray-600">{industryData.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

