"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Headset, Info, Loader2, Volume2 } from "lucide-react";
import { AIModelService } from "@/services/ai-model-service";
interface VoiceConfigModalProps {
  voiceModelList: Record<string, any>;
  voiceModel: string;
  setVoiceModel: (voiceModel: string) => void;
}
export function VoiceConfigModal({
  voiceModelList,
  voiceModel,
  setVoiceModel,
}: VoiceConfigModalProps) {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAccent, setSelectedAccent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [open, setOpen] = useState(false);

  const languages = [
    ...new Set(
      Object.values(voiceModelList).map((voice: any) => voice.language)
    ),
  ];
  const allAccents = [
    ...new Set(Object.values(voiceModelList).map((voice: any) => voice.accent)),
  ];
  const genders = [
    ...new Set(Object.values(voiceModelList).map((voice: any) => voice.gender)),
  ];

  // Filter accents based on selected language
  const accents = selectedLanguage
    ? selectedLanguage.toLowerCase() === "hindi"
      ? ["Standard"]
      : selectedLanguage.toLowerCase() === "english"
      ? allAccents.filter((accent) => accent !== "Standard")
      : allAccents
    : [];

  const filteredVoiceModels = Object.entries(voiceModelList).filter(
    ([_, voice]: [string, any]) => {
      return (
        (!selectedGender || voice.gender === selectedGender) &&
        (!selectedAccent || voice.accent === selectedAccent) &&
        (!selectedLanguage || voice.language === selectedLanguage)
      );
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                      <p>Select the primary language for the voice</p>
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
                      <p>
                        Choose the accent variation for the selected language
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={selectedAccent}
                onValueChange={setSelectedAccent}
                disabled={!selectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedLanguage
                        ? accents[0]
                        : "Select language to choose accent"
                    }
                  />
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
              <Select value={selectedGender} onValueChange={setSelectedGender}>
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
                <label>Voice</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select from available voices based on your filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={voiceModel} onValueChange={setVoiceModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {filteredVoiceModels.map(([id, voice]: [string, any]) => (
                    <SelectItem key={id} value={id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            type="submit"
          >
            Save & Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SelectedVoiceModelComponent({
  selectedVoiceName,
  selectedVoiceID,
}: {
  selectedVoiceName: string;
  selectedVoiceID: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    if(isLoading) return;
    setIsLoading(true);
    if (selectedVoiceName === "No voice selected") {
      return;
    }
    const aiModelService = new AIModelService();
    const blob = await aiModelService.textToSpeech(
      `Hello,I'm ${selectedVoiceName} and this is how I sound.`,
      selectedVoiceID
    );
    const audioElement = await aiModelService.playAudio(blob);
    audioElement.play();
    setIsLoading(false);
  };
  return (
    <div
      className="relative flex items-center gap-2 px-2 py-1 border rounded-md text-sm text-gray-600 cursor-pointer group"
      onClick={handleClick}
    >
      <Volume2 className="h-4 w-4" />
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <span className="truncate max-w-[150px]">{selectedVoiceName}</span>
      )}
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div className="absolute inset-0"></div>
          </TooltipTrigger>
          <TooltipContent>
           
              <p className="text-xs">
                Click me to test my voice
              </p>
            
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
