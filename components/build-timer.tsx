"use client"

import { useState, useEffect } from "react"
import { Timer } from "lucide-react"

export default function BuildTimer() {
  const [timeLeft, setTimeLeft] = useState(300)
  const [isExpired, setIsExpired] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Only run the timer on the client side
    if (typeof window === "undefined") return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsExpired(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    // Add scroll event listener
    const handleScroll = () => {
      // Minimize when scrolled down more than 100px
      setIsMinimized(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    // Clean up the interval and event listener on component unmount
    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Format the time as mm:ss
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  // Format with leading zeros
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Calculate progress percentage for the progress bar
  const progressPercentage = (timeLeft / 300) * 100

  return (
    <div
      className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${isMinimized || isExpired ? "py-1 bg-white/90 backdrop-blur-sm" : "py-3 bg-white"}`}
    >
      <div className="container-custom">
        <div className={`flex ${isMinimized || isExpired ? "justify-end" : "flex-col items-center justify-center"}`}>
          {isMinimized || isExpired ? (
            <div className="flex items-center bg-white/90 rounded-full shadow-sm px-3 py-1.5 border border-gray-200 gap-8">
                <p className="text-sm font-medium text-black">
                {isExpired
                  ? "Time's up! You qualify for a $100 credit."
                  : "If it takes more than 300 seconds to launch, you get $100 credit."}
                </p>
                <div className="flex items-center">
              <Timer className="h-4 w-4 text-black mr-2" />
              <span className="text-xs font-bold text-black">{formattedTime}</span>
              <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${isExpired ? "bg-red-500" : "bg-green-500"}`}
                  style={{ width: `${progressPercentage}%`, transition: "width 1s linear" }}
                ></div>
              </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-md mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-black">Less Than 300 Seconds or You Win</span>
                  <span className="text-sm font-bold text-black">{formattedTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`h-2.5 rounded-full ${isExpired ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${progressPercentage}%`, transition: "width 1s linear" }}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-medium text-black">
                {isExpired
                  ? "Time's up! You qualify for a $100 credit."
                  : "If it takes more than 300 seconds to launch, you get $100 credit."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

