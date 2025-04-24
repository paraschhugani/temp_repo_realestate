import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { useState, useRef } from "react"

export default function HeroSection({ setIsTestDialogOpen, setPhoneNumber, setSelectedCountry, countries }: { setIsTestDialogOpen: (isOpen: boolean) => void, setPhoneNumber: (phoneNumber: string) => void, setSelectedCountry: (selectedCountry: any) => void, countries: any }) {
  const demoAudioRef = useRef<HTMLAudioElement>(null)
  const playDemoAudio = () => {
    if (demoAudioRef.current) {
      demoAudioRef.current.play()
    }
  }
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden py-20 md:py-28">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Your AI Inside Sales Agent
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-6 animate-fade-in">
              Built for Real Estate
            </h2>

            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in-delay">
              superU sounds human, books appointments, and builds trust — each agent saves 20 hours per week.
            </p>

            {/* Audio player section moved to left */}
            <div
              className="mb-8 bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={playDemoAudio}
            >
              <div className="flex items-center gap-3 mb-2">
                <Play className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">superU - Property Inquiry Call</h4>
                  <p className="text-sm text-gray-600">Listen to how superU handles a real estate inquiry</p>
                </div>
              </div>
              <audio ref={demoAudioRef} controls className="w-full">
                <source src="/RE-audio-file.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link
                href="https://cal.com/superu/demo-setup-30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button onClick={() => setIsTestDialogOpen(true)} className="btn-secondary text-lg px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Hear superU in Action
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <img
                src="/real-estate-dashboard-ui.webp"
                alt="superU AI real estate dashboard showing call metrics and lead generation statistics"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
