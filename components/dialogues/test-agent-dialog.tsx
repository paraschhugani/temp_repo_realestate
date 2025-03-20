import { Loader2, Phone, Headphones, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import IIcon from "@/components/ui/i-icon-comp";
import { VoiceConfigModal } from "./voice-config-modal";
import SelectedVoiceModelComponent from "./voice-config-modal";
interface TestAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  voiceSpeed: number;
  onVoiceSpeedChange: (value: number) => void;
  backgroundSound: boolean;
  onBackgroundSoundChange: (value: boolean) => void;
  onTestAgent: () => void;
  isTesting: boolean;
  voiceModelList: Record<string, any>;
  voiceModel: string;
  setVoiceModel: (voiceModel: string) => void;
  selectedVoiceName: string;
}

export function TestAgentDialog({
  open,
  onOpenChange,
  phoneNumber,
  onPhoneNumberChange,
  voiceSpeed,
  onVoiceSpeedChange,
  backgroundSound,
  onBackgroundSoundChange,
  onTestAgent,
  isTesting,
  voiceModelList,
  voiceModel,
  setVoiceModel,
  selectedVoiceName,
}: TestAgentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] space-y-4">
        <DialogHeader>
          <DialogTitle>Configure AI Voice Settings</DialogTitle>
          <DialogDescription>
            Customize how your AI agent sounds before testing
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Phone Number Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="phone-number" className="text-sm font-medium">
                Your Phone Number
              </Label>
             <IIcon text="Enter your phone number to receive a test call from the AI agent" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="phone-number"
                type="tel"
                placeholder=""
                className="pl-10"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
              />
            </div>
          </div>
          
          {/* Voice Model Control */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="voice-model" className="text-sm font-medium">
                Voice Model
              </Label>  
              <IIcon text="Select the voice model you want to use for the test call" />
            </div>
             <div>
             <div className="flex items-center gap-3">
          <SelectedVoiceModelComponent selectedVoiceName={selectedVoiceName} />
          <VoiceConfigModal
            voiceModelList={voiceModelList}
            voiceModel={voiceModel}
            setVoiceModel={setVoiceModel}
          />
        </div>
             </div>
           
           
           </div>


          {/* Speech Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="speech-speed" className="text-sm font-medium">
                Agent Speech Speed
              </Label>
              <IIcon text="Adjust how fast or slow the AI agent speaks during the conversation" />
            </div>
            <div>
              <Label htmlFor="voice-speed">Voice Speed: {voiceSpeed}x</Label>
              <Slider
                id="voice-speed"
                min={0.5}
                max={2}
                step={0.1}
                value={[voiceSpeed]}
                onValueChange={(value) => onVoiceSpeedChange(value[0])}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slowest</span>
              <span>Fastest</span>
            </div>
          </div>

          {/* Background Noise Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="background-noise" className="text-sm font-medium">
                  Background Noise
                </Label>
               <IIcon text="Adds ambient office sounds to make calls sound more natural" />
              </div>
              <Switch
                id="background-noise"
                checked={backgroundSound}
                onCheckedChange={onBackgroundSoundChange}
              />
            </div>
            <p className="text-xs text-gray-500">
              {backgroundSound
                ? "Adds ambient office sounds to make calls sound more natural"
                : "No background noise will be added to calls"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onTestAgent} disabled={isTesting}>
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              <>
                <Headphones className="mr-2 h-4 w-4" />
                Start Test
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 