"use client"

import { useRef, useState } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
import Link from "next/link"

export default function VoiceDemoSection({ setIsTestDialogOpen, setPhoneNumber, setSelectedCountry, countries }: { setIsTestDialogOpen: (isOpen: boolean) => void, setPhoneNumber: (phoneNumber: string) => void, setSelectedCountry: (selectedCountry: any) => void, countries: any }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const demoAudioRef = useRef<HTMLAudioElement>(null)
  const playDemoAudio = () => {
    if (demoAudioRef.current) {
      demoAudioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // Here you would normally handle audio playback
  }

  return (
    <section className="py-20 bg-white" id="voice-demo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Hear superU in Action</h2>
            <p className="text-xl text-gray-600 mb-2">
              "superU doesn't sound like a bot. She sounds like someone on your team."
            </p>
            <p className="text-gray-600">
              Everything — from tone to words — is fully customizable to match your brand.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <Volume2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">superU - Property Inquiry Call</h3>
                  <p className="text-sm text-gray-600">Listen to how superU handles a real estate inquiry</p>
                </div>
              </div>
              <button
                onClick={playDemoAudio}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </button>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <audio ref={demoAudioRef} controls className="w-full">
                <source src="/RE-audio-file.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="https://cal.com/superu/demo-setup-30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 flex items-center justify-center"
              >
                Book a Demo
              </Link>
              <button  onClick={() => setIsTestDialogOpen(true)} className="btn-secondary px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition-all duration-300 flex items-center justify-center">
                Hear superU in Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
