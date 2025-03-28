"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";

  export default function SuccessStripe() {
    
    //  send message to parant window
    useEffect(() => {
      console.log("useEffect")
      console.log("window is defined" , window)
      window.opener.postMessage({ type: "stripe-checkout-completed" }, "*");
      console.log("window", window)
      }, []);

    // clsoe the window after 5 seconds
    // setTimeout(() => {
    //   window.close()
    // }, 5000)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      payment success
    </div>
  )
}

