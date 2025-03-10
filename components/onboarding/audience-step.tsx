"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
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
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Audience</h1>
        <p className="text-gray-600">Get started by creating your first contact list for your AI agent</p>
      </div>
      {csvData.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12">
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
        <div className="bg-white rounded-lg shadow-sm p-12">
          <h2 className="text-2xl font-bold mb-6">Uploaded Contacts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {csvData[0].map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csvData.slice(1, 6).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {csvData.length > 6 && (
            <p className="mt-4 text-sm text-gray-500">Showing 5 out of {csvData.length - 1} contacts</p>
          )}
          <div className="mt-8 text-center">
            <Button onClick={handleContinue} className="bg-black hover:bg-gray-800 text-white">
              Continue
            </Button>
          </div>
        </div>
      )}
      <UploadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onUploadSuccess={handleUploadSuccess} />
    </div>
  )
} 