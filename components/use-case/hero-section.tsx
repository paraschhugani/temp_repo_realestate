import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import VoiceDemoContainer from "@/components/use-case/voice-demo-section";
import { Button } from "../ui/button";
import { TestAgentDialog } from "../dialogues/test-agent-dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { toastService } from "@/services/toast-service";
import { StorageService } from "@/services/storage-service";
import { CampaignService } from "@/services/campaign-service";
import { useAuth } from "@clerk/nextjs";
import { AIModelService, default_voice_id } from "@/services/ai-model-service";
import TryAgentModal from "./try-agent-dialogue";

interface HeroSectionProps {
  title: string;
  subheadline: string;
  industry: string;
  useCase: string;
  href: string; // Add this line to include the href prop
}

export default function HeroSection({
  title,
  subheadline,
  industry,
  useCase,
  href,
}: HeroSectionProps) {
  const campaignService = useMemo(() => new CampaignService(), []);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [voiceModelList, setVoiceModelList] = useState<Record<string, any>>({});
  const [voiceModel, setVoiceModel] = useState(default_voice_id);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [backgroundSound, setbackgroundSound] = useState(false);
  const { getToken } = useAuth()



  useEffect(() => {
    const fetchVoiceModelList = async () => {
      try {
        const token = await getToken();
        const voiceModelList = await new AIModelService().getVoiceModelList(
          token ?? ""
        );
        setVoiceModelList(voiceModelList);
      } catch (error) {
        console.error("Error fetching voice models:", error);
        toastService.error("Failed to load voice models");
      }
    };
    fetchVoiceModelList();
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      const formatted = value; // TODO : Format the phone number
      setPhoneNumber(formatted);
    }
  };

  const handleVoiceSpeedChange = (value: number) => {
    StorageService.setItem("voice_speed", value.toString());
    setVoiceSpeed(value);
  };

  const handleBackgroundSoundChange = (value: boolean) => {
    StorageService.setItem("background_sound", value.toString());
    setbackgroundSound(value);
  };

  const handleVoiceModelChange = (value: string) => {
    StorageService.setItem("voice_model", value);
    setVoiceModel(value);
  };
  return (
    <section className="bg-gray-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-extrabold mb-8 animate-fade-in leading-tight">
              {title}
            </h1>
            <p className="text-xl mb-10 animate-fade-in-delay text-gray-600">
              {subheadline}
            </p>
            <Link
              href={href}
              className="btn-primary inline-flex items-center text-lg px-8 py-4 group animate-fade-in-delay-2 bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Get Started – First 1000 Calls Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsTestDialogOpen(true)}
                  className="inline-flex items-center bg-black text-white hover:bg-gray-800 font-medium py-2 px-5 text-sm rounded-md transition transform duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Try Now - Get a Demo Call
                  <span className="ml-2 bg-blue-500 text-xs font-bold px-2 py-1 rounded-full">
                    FREE
                  </span>
                </button>
              </div>

              <div className="mt-4">
                <VoiceDemoContainer
                  title={title}
                  description={`An AI ${title.toLowerCase()} agent is having a conversation with a customer, demonstrating how it handles real-world scenarios.`}
                  durationInSeconds={45}
                />
              </div>
            </div>
          </div>
          
        </div>
        <TryAgentModal 
        isOpen={isTestDialogOpen} 
        onClose={() => setIsTestDialogOpen(false)} 
        useCase={useCase} 
        voiceModel={voiceModel}
        selectedVoiceName={voiceModelList[voiceModel]?.name ?? "No voice selected"}
        voiceModelList={voiceModelList}
        setVoiceModel={setVoiceModel}
    
        />
      </div>
    </section>
  );
}
