"use client";

import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";
import { BasicInfoEditor } from "./basic-info-editor";
import { ScenarioEditor } from "./scenario-editor";
import { AIModelService } from "@/services/ai-model-service";
import { toastService } from "@/services/toast-service";
import { useAuth } from "@clerk/nextjs";

// Define interfaces
interface Message {
  speaker: string;
  content: string;
  fieldId?: string;
  placeholder?: string;
  label?: string;
  question?: string;
  type?: string;
  value?: string;
  response?: string;
}

interface ScriptField {
  id: string;
  label?: string;
  question: string;
  type: string;
  placeholder: string;
  category?: string;
  required?: boolean;
  description?: string;
  value?: string;
  messages?: Message[];
}

interface EditorScript {
  id: string;
  industry: string;
  description: string;
  form: ScriptField[];
  value: string;
}

interface Step {
  id: string;
  messages: Message[];
  next?: string[];
}

interface Scenario {
  id: string;
  title: string;
  description?: string;
  steps: Step[];
  tabName?: string;
}

interface Scenarios {
  [key: string]: Scenario;
}

interface ScriptEditorProps {
  script: EditorScript;
  scenarios: Scenario[];
  onSave: (updatedScript: EditorScript, updatedScenarios: Scenarios) => void;
  onContinue: () => void;
  voiceModelList: Record<string, any>;
  voiceModel: string;
  setVoiceModel: (voiceModel: string) => void;
}

export const ScriptEditor = forwardRef<{ handleSave: () => void }, ScriptEditorProps>(
  ({ script, scenarios, onSave, onContinue, voiceModelList, voiceModel, setVoiceModel }, ref) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [basicValues, setBasicValues] = useState<Record<string, string>>({});
  const [scenarioValues, setScenarioValues] = useState<Record<string, Record<string, string>>>({});
 

  const basicFields = useMemo(
    () => {
      const fields = script.form.filter(
        (field) => field.category === "basic"
      );
      return fields;
    },
    [script.form]
  );

  const scenarioFields = useMemo(
    () => script.form,
    [script.form]
  );

  // Add this helper function at the top of the component
  const replacePlaceholders = (content: string, companyName?: string, agentName?: string) => {
    let updatedContent = content;
    if (companyName) {
      updatedContent = updatedContent.replace(/\[Company Name\]/g, companyName);
    }
    if (agentName) {
      updatedContent = updatedContent.replace(/\[Agent Name\]/g, agentName);
    }
    return updatedContent;
  };

  const STORAGE_KEY = `script_editor_${script.id}`;

  const getStoredValues = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const storeValues = (values: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  };

  useEffect(() => {
    const initialBasicValues: Record<string, string> = {};
  
    basicFields.forEach((field) => {
      if (field.messages && field.messages.length > 0) {
        const agentMessage = field.messages.find(message => message.speaker === "agent");
        if (agentMessage) {
          initialBasicValues[field.id] = agentMessage.value || agentMessage.question || "";
        }
      } else {
        initialBasicValues[field.id] = field.value || field.question || "";
      }
    });
    
    // Try to get stored values first
    const storedValues = getStoredValues();
    if (storedValues) {
      setBasicValues(storedValues.basicValues);
      setScenarioValues(storedValues.scenarioValues);
      return;
    }

    setBasicValues(initialBasicValues);

    const initialScenarioValues: Record<string, Record<string, string>> = {};
    
    if (Array.isArray(scenarios)) {
      const companyName = initialBasicValues.companyName;
      const agentName = initialBasicValues.agentName;

      scenarios.forEach((scenario) => {
        const scenarioVal: Record<string, string> = {};
        
        if (scenario.steps && Array.isArray(scenario.steps)) {
          scenario.steps.forEach((step) => {
            if (step.messages && Array.isArray(step.messages)) {
              step.messages.forEach((message) => {
                if (message.fieldId) {
                  const baseContent = message.content || message.value || "";
                  scenarioVal[message.fieldId] = replacePlaceholders(baseContent, companyName, agentName);
                }
              });
            }
          });
        }
        
        initialScenarioValues[scenario.id] = scenarioVal;
      });
    }
    setScenarioValues(initialScenarioValues);

    // Store initial values
    storeValues({
      basicValues: initialBasicValues,
      scenarioValues: initialScenarioValues
    });
   
  }, [script, scenarios, basicFields, scenarioFields]);

  const handleBasicChange = (id: string, value: string): void => {
    setBasicValues((prev) => {
      const newBasicValues = {
        ...prev,
        [id]: value,
      };

      // Update scenario messages when company name or agent name changes
      if (id === "companyName" || id === "agentName") {
        const updatedScenarios = { ...scenarioValues };
        
        scenarios.forEach((scenario) => {
          const scenarioValues = { ...updatedScenarios[scenario.id] };
          
          scenario.steps.forEach((step) => {
            step.messages.forEach((message) => {
              if (message.fieldId) {
                const baseContent = message.content || message.value || "";
                scenarioValues[message.fieldId] = replacePlaceholders(
                  baseContent,
                  id === "companyName" ? value : newBasicValues.companyName,
                  id === "agentName" ? value : newBasicValues.agentName
                );
              }
            });
          });
          
          updatedScenarios[scenario.id] = scenarioValues;
        });

        setScenarioValues(updatedScenarios);
        
        // Store updated values
        storeValues({
          basicValues: newBasicValues,
          scenarioValues: updatedScenarios
        });

        // Update basic fields that contain placeholders
        script.form.forEach((field) => {
          if (field.messages) {
            field.messages.forEach((message) => {
              if (message.speaker === "agent" && message.value) {
                const updatedContent = replacePlaceholders(
                  message.value,
                  id === "companyName" ? value : newBasicValues.companyName,
                  id === "agentName" ? value : newBasicValues.agentName
                );
                if (updatedContent !== message.value) {
                  newBasicValues[field.id] = updatedContent;
                }
              }
            });
          }
        });
      }

      // Store the final values
      storeValues({
        basicValues: newBasicValues,
        scenarioValues
      });

      return newBasicValues;
    });
  };

  const handleScenarioChange = (scenarioId: string, fieldId: string, value: string): void => {
    setScenarioValues((prev) => {
      const newScenarioValues = {
        ...prev,
        [scenarioId]: {
          ...(prev[scenarioId] || {}),
          [fieldId]: value,
        },
      };

      // Store updated values
      storeValues({
        basicValues,
        scenarioValues: newScenarioValues
      });

      return newScenarioValues;
    });
  };

  // Expose handleSave method via ref
  useImperativeHandle(ref, () => ({
    handleSave: () => {
      const updatedScript: EditorScript = {
        ...script,
        form: script.form.map((field) => {
          const updatedField = { ...field };
          delete updatedField.value;
          
          if (field.messages && basicValues[field.id]) {
            updatedField.messages = field.messages.map(message => {
              if (message.speaker === "agent") {
                return {
                  ...message,
                  value: basicValues[field.id]
                };
              }
              return message;
            });
          }
          return updatedField;
        }),
      };

      const updatedScenarios: Scenarios = {};
      scenarios.forEach((scenario) => {
        const updatedSteps = scenario.steps.map((step) => {
          const updatedMessages = step.messages.map((message) => {
            if (message.speaker === "agent" && message.fieldId) {
              const value = scenarioValues[scenario.id]?.[message.fieldId];
              if (value) {
                return {
                  ...message,
                  content: value,
                  value: value
                };
              }
            }
            return message;
          });
          
          return {
            ...step,
            messages: updatedMessages,
          };
        });
        
        updatedScenarios[scenario.id] = {
          ...scenario,
          steps: updatedSteps,
        };
      });

      onSave(updatedScript, updatedScenarios);
    }
  }));

  if (!script || !Array.isArray(scenarios) || scenarios.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media (max-width: 640px) {
          .tabs-container {
            width: 100%;
          }
        }
      `}</style>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto tabs-container">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic">
          <BasicInfoEditor basicFields={basicFields} values={basicValues} onChange={handleBasicChange} voiceModelList={voiceModelList} voiceModel={voiceModel} setVoiceModel={setVoiceModel}  />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioEditor
            scenarios={scenarios}
            scenarioFields={scenarioFields}
            values={scenarioValues}
            onChange={handleScenarioChange}
            voiceModelList={voiceModelList}
            voiceModel={voiceModel}
            setVoiceModel={setVoiceModel}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={() => ref && typeof ref === 'object' && ref.current?.handleSave()} variant="outline">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button onClick={onContinue}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});
