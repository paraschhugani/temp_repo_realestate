"use client"
import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { ArrowLeft, Check, Phone, Bot, Calendar, MessageSquare } from "lucide-react"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Benefits Section (Left) */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 md:p-12 text-white">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-3xl font-bold mb-4">Free for today</h2>
                <p className="text-blue-100 text-lg mb-4">Try our AI receptionist with no credit card required</p>
              </div>

              <div className="space-y-6 flex-grow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/10 p-2 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Answer calls 24/7</h3>
                    <p className="text-blue-100">Never miss another booking opportunity, even after hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/10 p-2 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Booking Management</h3>
                    <p className="text-blue-100">Confirm, cancel, or reschedule appointments automatically</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/10 p-2 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Multi-channel Confirmation</h3>
                    <p className="text-blue-100">Send confirmations via SMS, WhatsApp, and Email</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-end space-x-6 justify-center">

                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <img src="/images/g2.svg" alt="testimonial" width={50} height={50} />
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6"
                          fill={i < 4 || (i === 4 && 0.8 > 0) ? "white" : "none"}
                          stroke="white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          ></path>
                        </svg>
                      ))}
                      <span className="ml-1 text-white text-lg">4.8</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <img src="/images/trustpilot.svg" alt="testimonial" width={170} height={170} />
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6"
                          fill={i < 4 || (i === 4 && 0.8 > 0) ? "white" : "none"}
                          stroke="white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          ></path>
                        </svg>
                      ))}
                      <span className="ml-1 text-white text-lg">4.8</span>
                    </div>
                  </div>

                  

                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center mt-2">
                  <div className="bg-green-500 rounded-full p-1 mr-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="font-medium">No credit card required to start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form (Right) */}
          <div className="w-full md:w-1/2  flex items-center justify-center">
          <SignIn
                afterSignInUrl={redirectUrl}
                routing="path"
                path="/sign-in"
                appearance={{
                  elements: {
                    rootBox: "w-full h-full",
                    card: "w-full h-full shadow-none",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                  },
                }}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

