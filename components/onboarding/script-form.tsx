"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Phone, Headphones } from "lucide-react";
import { ScriptEditor } from "@/components/script-editor/script-editor";
import { useAuth } from "@clerk/clerk-react";
import { OnboardingService } from "@/services/onboarding-service";
import ScriptNotFound from "./script-not-found";
import {
  scriptFormKey,
  StorageService,
  voice_model,
} from "@/services/storage-service";
import { toastService } from "@/services/toast-service";
import { AIModelService, default_voice_id } from "@/services/ai-model-service";
import { Button } from "@/components/ui/button";
import { CampaignService } from "@/services/campaign-service";
import { SuccessDialog } from "../ui/success-dialog";
import { TestAgentDialog } from "../dialogues/test-agent-dialog";
import CallRatingModal from "@/components/call-rating-modal";

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
  showLaunchAgent?: boolean;
  dashboard?: boolean;
  setBack?: () => void;
  setNext?: () => void;
}

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { code: "RU", name: "Russia", flag: "🇷🇺", dialCode: "+7" },
]

export function ScriptForm({ useCase, showLaunchAgent, dashboard , setBack, setNext}: ScriptFormProps) {
  const campaignService = useMemo(() => new CampaignService(), []);
  const [scriptData, setScriptData] = useState<Script | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [voiceModelList, setVoiceModelList] = useState<Record<string, any>>({});
  const [finalLaunchLoading, setFinalLaunchLoading] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [backgroundSound, setbackgroundSound] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const router = useRouter();
  const { getToken, isSignedIn, isLoaded, userId } = useAuth();
  const scriptEditorRef = useRef<{ handleSave: () => void } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Record<string, any> | null>(countries[0]);

  const [callFeedbackOpen, setCallFeedbackOpen] = useState(false);
  const [callUUID, setCallUUID] = useState("");
  const cached_voice_id = StorageService.getItem(voice_model);
  var inital_voice_id;
  if (cached_voice_id) inital_voice_id = cached_voice_id;
  else inital_voice_id = default_voice_id;
  const [voiceModel, setVoiceModel] = useState(inital_voice_id);

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

        if (data === null) {
          setIsLoading(false);
          setIsNotFound(true);
          return;
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

  useEffect(() => {
    console.log(selectedCountry);
  }, [selectedCountry]);
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
    // toastService.success("Script saved successfully!");
    StorageService.setItem(scriptFormKey, JSON.stringify(formattedScript));
  };

  const handleSubmit = async (
    setActiveTab: (activeTab: string) => void
  ): Promise<void> => {
    setIsLoading(true);
    try {
      if (!StorageService.getScenarioTabViewed()) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        StorageService.setScenarioTabViewed(true);
        setActiveTab("scenarios");
        return;
      } else if (!StorageService.getTestAgentButtonClicked()) {
        // toastService.custom("Please test your agent at least once before proceeding.");
        // window.scrollTo({ top: 0, behavior: "smooth" });
        setIsTestDialogOpen(true);
        return;
      } else {
        setIsSuccessDialogOpen(true);
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToIntegration = () => {
    if (dashboard) {
      setNext && setNext();
    } else {
      router.push(`/launch/${useCase}/integration`);
    }
  };

  useEffect(() => {
    const loadSavedData = () => {
      const savedData = StorageService.getItem(scriptFormKey);
      if (savedData) {
        try {
          setScriptData({
            id: savedData.id,
            industry: savedData.industry,
            name: savedData.name,
            value: savedData.value,
            description: savedData.description,
            fields: savedData.fields,
          });
          setScenarios(savedData.scenarios);
        } catch (error) {
          console.error("Error parsing saved data:", error);
        }
      }
    };

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
    if(isTesting) return;
    setIsTesting(true);
    try {
      scriptEditorRef.current?.handleSave(); // save updated script to localstorage
      // setBack && setBack();
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        toastService.error(
          "Please enter a valid phone number with at least 10 digits"
        );
        return;
      }
      if (!voiceModel) {
        toastService.error("Please select a voice model");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const token = await getToken();

      const DemoCallResponse = await campaignService.testCampaign({
        country_code: selectedCountry?.dialCode,
        phone_number: phoneNumber,
        voiceModel: voiceModel,
        voiceSpeed: voiceSpeed,
        backgroundSound: backgroundSound,
        token: token ?? "",
        userID: userId ?? "",
      });

      setCallUUID(DemoCallResponse.id);
      setCallFeedbackOpen(true);
      StorageService.setTestAgentButtonClicked(true); // set the test agent button clicked to true
      setIsTestDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleLaunchAgent = async () => {
    try {
      if(finalLaunchLoading) return;
      setFinalLaunchLoading(true);
      const token = await getToken();
      await campaignService.launchAgent({
        campaign_name: "Test Campaign",
        campaign_description: "Test Campaign Description",
        campaign_status: "active",
        userID: userId ?? "",
        token: token ?? "",
      });
      setFinalLaunchLoading(false);
    } catch (error) {
      toastService.error("Failed to launch campaign");
      setFinalLaunchLoading(false);
    } finally {
      // done !!
    }
  };
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

  if (isNotFound) {
    return <ScriptNotFound />;
  }

  if (isInitializing || isLoading || !scriptData || !scenarios) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dashboard ? "" : "bg-gray-50"} py-2 px-4 sm:px-6 lg:px-8`}>
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
                    {dashboard ? "" : "Configure Your AI Agent Script"}
                  </h1>
                  <h2 className="text-lg font-semibold text-gray-600">
                    {dashboard ? "" : "Use case : " + formatUseCase(useCase)}
                  </h2>
                </div>

                <div className="mt-4 md:mt-0 flex flex-row gap-4">
                  <Button
                    onClick={() => setIsTestDialogOpen(true)}
                    className="bg-black hover:bg-gray-800 text-white rounded-lg px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Test Agent
                  </Button>
                  {showLaunchAgent && (
                    <Button
                      onClick={handleLaunchAgent}
                      className="bg-black hover:bg-gray-800 text-white rounded-lg px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                    >
                      {finalLaunchLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Launching...
                        </>
                      ) : (
                        "Launch Agent"
                      )}
                    </Button>
                  )}
                </div>
              </div>

              <TestAgentDialog
                open={isTestDialogOpen}
                onOpenChange={setIsTestDialogOpen}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={handlePhoneNumberChange}
                voiceSpeed={voiceSpeed}
                onVoiceSpeedChange={handleVoiceSpeedChange}
                backgroundSound={backgroundSound}
                onBackgroundSoundChange={handleBackgroundSoundChange}
                onTestAgent={handleTestAgent}
                isTesting={isTesting}
                voiceModelList={voiceModelList}
                voiceModel={voiceModel}
                setVoiceModel={handleVoiceModelChange}
                selectedVoiceName={voiceModelList[voiceModel]?.name ?? "No voice selected"}
                countries={countries}
                selectedCountry={selectedCountry || countries[0]}
                setSelectedCountry={setSelectedCountry}
              />

              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <ScriptEditor
                  ref={scriptEditorRef}
                  script={convertToEditorScript(scriptData)}
                  scenarios={scenarios}
                  onSave={handleSave}
                  onContinue={handleSubmit}
                  voiceModelList={voiceModelList}
                  voiceModel={voiceModel}
                  setVoiceModel={handleVoiceModelChange}
                  showLaunchAgent={showLaunchAgent ?? false}
                  dashboard={dashboard}
                  setBack={setBack}
                />
              </div>
              <SuccessDialog
                open={isSuccessDialogOpen}
                onOpenChange={setIsSuccessDialogOpen}
                onContinue={handleContinueToIntegration}
              />
              <CallRatingModal
                isOpen={callFeedbackOpen}
                onClose={() => setCallFeedbackOpen(false)}
                callUUID={callUUID}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
