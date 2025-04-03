"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import ContinueCtaButton from "@/components/continue-cta-button"
interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
}

export function SuccessDialog({ open, onOpenChange, onContinue }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Congratulations! 🎉</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Agent Testing Complete</h3>
            <p className="text-muted-foreground">
              Great job! You've successfully completed agent testing. 
              Let's move forward with the integration.
            </p>
          </div>
          <ContinueCtaButton text="Connect your Calendar" onClick={onContinue} disabled={false} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 