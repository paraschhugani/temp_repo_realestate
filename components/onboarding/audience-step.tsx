"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UploadDialog } from "@/components/onboarding/upload-dialog"

interface AudienceStepProps {
  useCase: string;
  onComplete?: () => void;
}

export function AudienceStep({ useCase, onComplete }: AudienceStepProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [csvData, setCsvData] = useState<string[][]>([])
  const router = useRouter()

  const handleUploadSuccess = (data: string[][]) => {
    setCsvData(data)
  }

  const handleContinue = () => {
    if (onComplete) {
      onComplete()
    } else {
      router.push(`/launch/${useCase}/aquire-phone`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Audience</h1>
        <p className="text-gray-600">Get started by creating your first contact list for your AI agent</p>
      </div>
      {csvData.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Create your first contact list</h2>
            <p className="text-gray-600 mb-8">Upload your contacts to start engaging with your audience</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-black hover:bg-gray-800 text-white">
              New Contact List
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Uploaded Contacts</h2>
          <div className="overflow-x-auto mb-4">
            <div className="max-h-[280px] overflow-y-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {csvData[0].map((header, index) => (
                      <th key={index} className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {csvData.slice(1, 51).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {csvData.length > 51 && (
            <p className="text-sm text-gray-500 mb-6">Showing first 50 out of {csvData.length - 1} contacts</p>
          )}
          <div className="text-center">
            <Button onClick={handleContinue} className="bg-black hover:bg-gray-800 text-white rounded px-6 py-3 text-base group transition-all duration-300 ease-in-out">
              Continue
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}
      <UploadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onUploadSuccess={handleUploadSuccess} />
    </div>
  )
} 