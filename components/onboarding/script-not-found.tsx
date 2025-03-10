"use client"

import { ArrowLeft, FileX2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ScriptNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-gray-100 p-4 rounded-full inline-block mb-6">
          <FileX2 className="h-12 w-12 text-gray-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Script Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
        We are sorry, but we are working on adding more scripts.
        </p>

        <Button
          onClick={() => router.back()}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </motion.div>
    </div>
  )
}
