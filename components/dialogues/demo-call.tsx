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
import { useState } from "react";
import { SelectValue } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, Select } from "../ui/select"
interface DemoCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTestAgent: () => void;
  countries: Record<string, any>[];
  selectedCountry: Record<string, any>;
  setSelectedCountry: (country: Record<string, any>) => void;
}


export function DemoCallDialog({
  open,
  onOpenChange,
  phoneNumber,
  onPhoneNumberChange,
  countries,
  selectedCountry,
  setSelectedCountry,
  handleTestAgent
}: DemoCallDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] space-y-4">
        <DialogHeader>
          <DialogTitle>Try this demo call</DialogTitle>
            <DialogDescription>
                you will receive a call from the AI agent
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
            <div className="flex items-center gap-5">

              <div className="flex items-center  w-full gap-2">
              <Select 
                value={selectedCountry.code} 
                onValueChange={(value) => setSelectedCountry(countries.find(c => c.code === value) || countries[0])}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.dialCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Phone className="h-4 w-4 absolute left-32" />
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
          </div>
          


        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button disabled={phoneNumber.length !== 10} onClick={() => {
            handleTestAgent()
          }}>
            Call Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 