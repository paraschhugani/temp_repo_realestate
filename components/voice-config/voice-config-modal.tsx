"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Headset, Info } from "lucide-react"
interface VoiceConfigModalProps {
  voiceModelList: Record<string, any>
  voiceModel: string
  setVoiceModel: (voiceModel: string) => void
}

export function VoiceConfigModal({
  voiceModelList,
  voiceModel,
  setVoiceModel,
}: VoiceConfigModalProps) {
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedAccent, setSelectedAccent] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")

  const languages = [...new Set(Object.values(voiceModelList).map((voice: any) => voice.language))]
  const accents = [...new Set(Object.values(voiceModelList).map((voice: any) => voice.accent))]
  const genders = [...new Set(Object.values(voiceModelList).map((voice: any) => voice.gender))]

  const filteredVoiceModels = Object.entries(voiceModelList).filter(([_, voice]: [string, any]) => {
    return (
      (!selectedGender || voice.gender === selectedGender) &&
      (!selectedAccent || voice.accent === selectedAccent) &&
      (!selectedLanguage || voice.language === selectedLanguage)
    )
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 h-8 px-2"
        >
          <Headset className="h-3.5 w-3.5" />
          <span className="text-sm">Choose your voice</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Voice Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="language">Language</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the primary language for the voice model</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="accent">Accent</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the accent variation for the selected language</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={selectedAccent}
                onValueChange={setSelectedAccent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select accent" />
                </SelectTrigger>
                <SelectContent>
                  {accents.map((accent) => (
                    <SelectItem key={accent} value={accent}>
                      {accent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="gender">Gender</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the voice gender preference</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={selectedGender}
                onValueChange={setSelectedGender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label>Voice Model</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select from available voice models based on your filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={voiceModel}
                onValueChange={setVoiceModel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voice model" />
                </SelectTrigger>
                <SelectContent>
                  {filteredVoiceModels.map(([id, voice] : [string, any]) => (
                    <SelectItem key={id} value={id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 