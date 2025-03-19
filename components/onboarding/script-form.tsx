"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Phone, Headphones } from "lucide-react";
import { ScriptEditor } from "@/components/script-editor/script-editor";
import { useAuth } from "@clerk/clerk-react";
import { OnboardingService } from "@/services/onboarding-service";
import ScriptNotFound from "./script-not-found";
import { scriptFormKey, StorageService } from "@/services/storage-service";
import { toastService } from "@/services/toast-service";
import { AIModelService } from "@/services/ai-model-service";
import { Button } from "@/components/ui/button";
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
import { CampaignService } from "@/services/campaign-service";

interface ScriptField {
  id: string;
  label?: string;
  question: string;
  type: string;
  placeholder: string;
  category?: string;
  required?: boolean;
  value?: string;
}

interface Script {
  id: string;
  industry: string;
  name: string;
  value: string;
  description: string;
  fields: ScriptField[];
}

interface EditorScript {
  id: string;
  industry: string;
  description: string;
  form: ScriptField[];
  value: string;
}

interface Message {
  speaker: string;
  content: string;
  fieldId?: string;
  placeholder?: string;
}

interface Step {
  id: string;
  messages: Message[];
  next?: string[];
}

interface Scenario {
  id: string;
  title: string;
  content?: Message[];
  tabName?: string;
  description?: string;
  steps: Step[];
}

// Backend response type
interface ScriptResponse {
  id: string;
  name: string;
  description: string;
  industry: string;
  fields: ScriptField[];
  scenarios: Scenario[];
  value: string;
}

interface ScriptFormProps {
  useCase: string;
  onSubmit?: () => void;
}

export function ScriptForm({ useCase, onSubmit }: ScriptFormProps) {
  const campaignService = useMemo(() => new CampaignService(), [])
  const [scriptData, setScriptData] = useState<Script | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [voiceModelList, setVoiceModelList] = useState<Record<string, any>>({});
  const [voiceModel, setVoiceModel] = useState("");
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [backgroundSound, setbackgroundSound] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isTestingAgent, setIsTestingAgent] = useState(false);
  const router = useRouter();
  const { getToken, isSignedIn, isLoaded, userId } = useAuth();
  const configSectionRef = useRef<HTMLDivElement>(null)
  const [phoneNumberError, setPhoneNumberError] = useState("")
  useEffect(() => {
    let isMounted = true;

    const fetchScript = async () => {
      try {
        if (!isLoaded) return;
        if (isLoaded && !isSignedIn) {
          router.push(`/sign-in?redirect_url=/launch/${useCase}/form`);
          return;
        }

        const token = await getToken();
        const onboardingService = new OnboardingService(
          process.env.NEXT_PUBLIC_BACKEND_URL || ""
        );

        const response = await onboardingService.getScript(
          useCase,
          token ?? ""
        );
        let data: ScriptResponse;
        if (typeof response === "string") {
          data = JSON.parse(response);
        } else {
          data = response;
        }

        if (data && isMounted) {
          // Convert the response to our Script format
          const formattedScript: Script = {
            id: data.id,
            industry: data.industry,
            name: data.name,
            value: data.value,
            description: data.description,
            fields: data.fields || [],
          };
          setScriptData(formattedScript);

          // Set scenarios directly as they're already in the correct format
          if (Array.isArray(data.scenarios)) {
            setScenarios(data.scenarios);
          } else {
            setScenarios([]);
          }
        }
      } catch (error: any) {
        if (!isMounted) return;

        if (error?.response?.status === 401) {
          router.push(`/sign-in?redirect_url=/launch/${useCase}/form`);
        } else if (error?.response?.status === 404) {
          setIsNotFound(true);
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    fetchScript();

    return () => {
      isMounted = false;
    };
  }, [useCase, getToken, router, isSignedIn, isLoaded]);

  const convertToEditorScript = (script: Script): EditorScript => {
    return {
      id: script.id,
      industry: script.industry,
      description: script.description,
      form: script.fields.map((field) => {
        const convertedField = { ...field };
        delete convertedField.value;
        return convertedField;
      }),
      value: script.value,
    };
  };

  const handleSave = (
    updatedScript: EditorScript,
    updatedScenarios: any
  ): void => {
    // Convert to ScriptResponse format
    const formattedScript: ScriptResponse = {
      id: updatedScript.id,
      name: updatedScript.id,
      description: updatedScript.description,
      industry: updatedScript.industry,
      fields: updatedScript.form.map((field) => {
        const formattedField = { ...field };
        // Remove field-level value, as values should only exist in messages
        delete formattedField.value;
        return formattedField;
      }),
      scenarios: Array.isArray(updatedScenarios) 
        ? updatedScenarios 
        : Object.values(updatedScenarios),
      value: updatedScript.value ?? "",
    };

    // Update local state
    setScriptData({
      id: formattedScript.id,
      industry: formattedScript.industry,
      name: formattedScript.name,
      value: formattedScript.value,
      description: formattedScript.description,
      fields: formattedScript.fields,
    });
    setScenarios(formattedScript.scenarios);
    console.log(formattedScript);
    StorageService.setItem(scriptFormKey, JSON.stringify(formattedScript));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // if (scriptData && scenarios) {
      //   // Save current state before proceeding
      //   const dataToSave = {
      //     script: scriptData,
      //     scenarios: scenarios,
      //   };

      //   StorageService.setItem(scriptFormKey, JSON.stringify(dataToSave));
      // }

      if (onSubmit) {
        onSubmit();
      } else {
        // router.push(`/launch/${useCase}/integration`);
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadSavedData = () => {
      const savedData = StorageService.getItem(scriptFormKey);
      if (savedData) {
        try {
          const parsedData: ScriptResponse = JSON.parse(savedData);
          
  
          setScriptData({
            id: parsedData.id,
            industry: parsedData.industry,
            name: parsedData.name,
            value: parsedData.value,
            description: parsedData.description,
            fields: parsedData.fields,
          });

          // Update scenarios
          setScenarios(parsedData.scenarios);
        } catch (error) {
          console.error("Error parsing saved data:", error);
        }
      }
    };

    // Try to load saved data if we don't have data yet
    if (!scriptData || !scenarios) {
      loadSavedData();
    }
  }, []);

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
  }, [getToken]);

  const formatUseCase = (str: string): string => {
    if (!str) return "";
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleTestAgent = async () => {
    setIsTesting(true);
    try {
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        setPhoneNumberError("Please enter a valid phone number with at least 10 digits");
       return;
      }
      if(!voiceModel){
        toastService.error("Please select a voice model");
        configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        return
      }
      
      
        setIsTestingAgent(true);
        const token = await getToken();
        
        await campaignService.testCampaign({
          phone_number: phoneNumber,
          voiceModel : voiceModel,
          voiceSpeed : voiceSpeed,
          backgroundSound : backgroundSound,
          token : token ?? "",
          userID : userId ?? ""
        });
      toastService.success("Test call initiated successfully!");
      setIsTestDialogOpen(false);
    } catch (error) {
      toastService.error("Failed to initiate test call");
    } finally {
      setIsTesting(false);
    }
  
}

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      const formatted = value;   // TODO : Format the phone number
      setPhoneNumber(formatted);
    }
  };

  if (isInitializing || isLoading || !scriptData || !scenarios) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isNotFound) {
    return <ScriptNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {scriptData && scenarios && (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex-1 text-left md:pr-8">
                  <h1 className="text-3xl font-extrabold mb-2">
                    Configure Your AI Agent Script
                  </h1>
                  <h2 className="text-lg font-semibold text-gray-600">
                    Use case : {formatUseCase(useCase)}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {scriptData.description}
                  </p>
                </div>
               
                <div className="mt-4 md:mt-0">
                  <Button
                    onClick={() => setIsTestDialogOpen(true)}
                    className="bg-black hover:bg-gray-800 text-white rounded-lg px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Test Agent
                  </Button>
                </div>
              </div>

              {/* Test Agent Dialog */}
              <Dialog
                open={isTestDialogOpen}
                onOpenChange={setIsTestDialogOpen}
              >
                <DialogContent className="sm:max-w-[500px] space-y-4">
                  <DialogHeader>
                    <DialogTitle>Configure AI Voice Settings</DialogTitle>
                    <DialogDescription>
                      Customize how your AI agent sounds before testing
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 ">
                    {/* Phone Number Input */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="phone-number"
                          className="text-sm font-medium"
                        >
                          Your Phone Number
                        </Label>
                        <div className="relative flex items-center group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            Enter your phone number to receive a test call from the AI agent
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="phone-number"
                          type="tel"
                          placeholder=""
                          className="pl-10"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                    </div>

                    {/* Speech Speed Control */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="speech-speed"
                          className="text-sm font-medium"
                        >
                          Agent Speech Speed
                        </Label>
                        <div className="relative flex items-center group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            Adjust how fast or slow the AI agent speaks during the conversation
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="voice-speed">
                          Voice Speed: {voiceSpeed}x
                        </Label>
                        <Slider
                          id="voice-speed"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSpeed]}
                          onValueChange={(value) => setVoiceSpeed(value[0])}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Slowest</span>
                        {/* <span>Normal</span> */}
                        <span>Fastest</span>
                      </div>
                    </div>

                    {/* Background Noise Control */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor="background-noise"
                            className="text-sm font-medium"
                          >
                            Background Noise
                          </Label>
                          <div className="relative flex items-center group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                              Adds ambient office sounds to make calls sound more natural
                            </div>
                          </div>
                        </div>
                        <Switch
                          id="background-noise"
                          checked={backgroundSound}
                          onCheckedChange={setbackgroundSound}
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
                    <Button onClick={handleTestAgent} disabled={isTesting}>
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

              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <ScriptEditor
                  script={convertToEditorScript(scriptData)}
                  scenarios={scenarios}
                  onSave={handleSave}
                  onContinue={handleSubmit}
                  voiceModelList={voiceModelList}
                  voiceModel={voiceModel}
                  setVoiceModel={setVoiceModel}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
