import Link from "next/link"
import { ArrowRight, Bot } from "lucide-react"

export default function SpaHowItWorksSection() {
  return (
    <section className="py-40 bg-white" id="HIW" >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">How It Works</h2>
        

        <Link className="flex flex-col md:flex-row align-top justify-between mb-16 max-w-5xl mx-auto" href="/launch/spa-and-salon-appointment-scheduling/form">
          {/* Step 1: Customer Calls */}
          <div className="flex flex-col items-start text-center mb-12 md:mb-0 relative w-full md:w-1/5">
            <div className="w-32 h-32 rounded-3xl border-2 border-navy-900 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md overflow-hidden self-center">
              
              <svg
                className="h-16 w-16 text-navy-900"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.31 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
            <div className="text-navy-900 font-bold text-lg self-center">Customer</div>
            <div className="text-navy-900 font-bold text-lg self-center">Calls</div>

            {/* Arrow - only visible on desktop */}
            <div className="hidden md:block absolute -right-4 top-16">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Step 2: AI Answers */}
          <div className="flex flex-col items-start text-center mb-12 md:mb-0 relative w-full md:w-1/5">
            <div className="w-32 h-32 rounded-3xl border-2 border-navy-900 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-purple-100 shadow-md overflow-hidden self-center">
              
              <Bot className="h-16 w-16 text-navy-900" />
            </div>
            <div className="text-navy-900 font-bold text-lg self-center">AI</div>
            <div className="text-navy-900 font-bold text-lg self-center">Answers</div>
            <div className="text-navy-900 font-bold text-lg self-center">Instantly</div>

            {/* Arrow - only visible on desktop */}
            <div className="hidden md:block absolute -right-4 top-16">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Step 3: Books Appointments */}
          <div className="flex flex-col items-start text-center mb-12 md:mb-0 relative w-full md:w-1/5">
            <div className="w-32 h-32 rounded-3xl border-2 border-navy-900 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md overflow-hidden self-center">
              
              <svg
                className="h-16 w-16 text-navy-900"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 9.09H20.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 13.7H15.7037"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 16.7H15.7037"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 13.7H12.0045"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 16.7H12.0045"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 13.7H8.30329"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 16.7H8.30329"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-navy-900 font-bold text-lg self-center">Books</div>
            <div className="text-navy-900 font-bold text-lg self-center">Appointments</div>
            <div className="text-navy-900 font-bold text-lg self-center">or Answers</div>
            <div className="text-navy-900 font-bold text-lg self-center">Questions</div>

            {/* Arrow - only visible on desktop */}
            <div className="hidden md:block absolute -right-4 top-16">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Step 4: Sends Confirmation */}
          <div className="flex flex-col items-start text-center mb-12 md:mb-0 relative w-full md:w-1/5">
            <div className="w-32 h-32 rounded-3xl border-2 border-navy-900 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-green-100 shadow-md overflow-hidden self-center">
              <svg
                className="h-16 w-16 text-navy-900"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-navy-900 font-bold text-lg self-center">Sends</div>
            <div className="text-navy-900 font-bold text-lg self-center">Confirmation on</div>
            <div className="text-navy-900 font-bold text-lg self-center">SMS, WhatsApp</div>
            <div className="text-navy-900 font-bold text-lg self-center">and Email</div>

            {/* Arrow - only visible on desktop */}
            <div className="hidden md:block absolute -right-4 top-16">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke="#0a1f44"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Step 5: You Save Time */}
          <div className="flex flex-col items-start text-center w-full md:w-1/5">
            <div className="w-32 h-32 rounded-3xl border-2 border-navy-900 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md overflow-hidden self-center">
              <svg
                className="h-16 w-16 text-navy-900"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 22H22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-navy-900 font-bold text-lg self-center">You Save Time,</div>
            <div className="text-navy-900 font-bold text-lg self-center">Get More</div>
            <div className="text-navy-900 font-bold text-lg self-center">Bookings</div>
          </div>
        </Link>

        <div className="text-center">
          <Link
            href="/launch/spa-and-salon-appointment-scheduling/form"
            className="btn-primary inline-flex items-center text-lg px-10 py-4 group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Free Trial - Free for 7 days
            <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

