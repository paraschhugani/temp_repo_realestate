"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowUpDown, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "../ui/button"
import { AudienceService } from "@/services/audience-service"
import { useAuth } from "@clerk/nextjs"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadSuccess: (data: string[][]) => void
}

export function UploadDialog({ open, onOpenChange, onUploadSuccess }: UploadDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { getToken, userId } = useAuth()

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)
      setSuccess(false)
      setIsLoading(true)

      if (rejectedFiles.length > 0) {
        setError("Please upload a valid CSV file under 2MB")
        setIsLoading(false)
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        try {
          const token = await getToken()
          const audienceService = new AudienceService()
          
          await audienceService.createAudience({
            audience_name: file.name.replace('.csv', ''),
            audience_description: `Uploaded on ${new Date().toLocaleDateString()}`,
            csv_file: file,
          }, token || "", userId || "")

          if (error) {
            setError(error);
            return;
          }

          // Read file for frontend display
          const reader = new FileReader()
          reader.onload = (e) => {
            const text = e.target?.result
            if (typeof text === "string") {
              const data = text.split("\n").map((row) => row.split(","))
              setSuccess(true)
              onUploadSuccess(data)
              
              setTimeout(() => {
                onOpenChange(false)
              }, 1500)
            }
          }
          reader.readAsText(file)
        } catch (error: any) {
          console.log(error);
          setError(error.message || "Failed to create audience")
        } finally {
          setIsLoading(false)
        }
      }
    },
    [onUploadSuccess, onOpenChange, getToken, userId],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: false,
  })

 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-center w-full">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">1</div>
                    <div className="flex-1 h-px bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      2
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-black font-medium">Upload CSV</span>
                    <span className="text-gray-500">Add Contacts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!success ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                ${isDragActive ? "border-black bg-gray-50" : "border-gray-300 hover:border-black"}
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              <ArrowUpDown className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mb-4">You can upload a file up to 2 MB</p>
              <div className="text-sm text-gray-600">
              Need Help?{" "}
              <Button onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = '/test/test_audience.csv';
                link.download = 'test_audience.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }} variant="link" className="p-0 h-auto text-blue-500 hover:text-black">
                Download our CSV
              </Button>{" "}
              template to make sure your CSV is formatted correctly.
            </div>
            {isLoading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          ) : (
            <div className="text-center p-12">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-medium text-green-600">Upload Successful!</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

