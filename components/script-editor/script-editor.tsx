"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";
import { BasicInfoEditor } from "./basic-info-editor";
import { ScenarioEditor } from "./scenario-editor";

// Define interfaces
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
}

interface EditorScript {
  id: string;
  industry: string;
  "agent name": string;
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
  description?: string;
  steps: Step[];
  tabName?: string;
}

// Updated: Scenarios is now a map of scenario objects
interface Scenarios {
  [key: string]: Scenario;
}

interface ScriptEditorProps {
  script: EditorScript;
  scenarios: Scenario[];
  onSave: (updatedScript: EditorScript, updatedScenarios: Scenarios) => void;
  onContinue: () => void;
}

export function ScriptEditor({ script, scenarios, onSave, onContinue }: ScriptEditorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [basicValues, setBasicValues] = useState<Record<string, string>>({});
  const [scenarioValues, setScenarioValues] = useState<Record<string, Record<string, string>>>({});

  // Memoize computed fields to avoid re-creation on every render.
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


  useEffect(() => {
  
    const initialBasicValues: Record<string, string> = {};
    basicFields.forEach((field) => {
      initialBasicValues[field.id] = field.value || field.question;
    });
    setBasicValues(initialBasicValues);

    const initialScenarioValues: Record<string, Record<string, string>> = {};
    
 
    if (Array.isArray(scenarios)) {
      scenarios.forEach((scenario) => {
      
        
        const scenarioVal: Record<string, string> = {};
        
        // Process messages from all steps
        if (scenario.steps && Array.isArray(scenario.steps)) {
          scenario.steps.forEach((step) => {
            
            if (step.messages && Array.isArray(step.messages)) {
              step.messages.forEach((message) => {
                if (message.speaker === "agent" && message.fieldId) {
                
                  scenarioVal[message.fieldId] = message.content;
                }
              });
            }
          });
        }
        
        initialScenarioValues[scenario.id] = scenarioVal;
      });
    }
    setScenarioValues(initialScenarioValues);
   
  }, [script, scenarios, basicFields, scenarioFields]);

  const handleBasicChange = (id: string, value: string): void => {
    setBasicValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleScenarioChange = (scenarioId: string, fieldId: string, value: string): void => {
    setScenarioValues((prev) => ({
      ...prev,
      [scenarioId]: {
        ...(prev[scenarioId] || {}),
        [fieldId]: value,
      },
    }));
  };

  const handleSave = (): void => {
  
    const updatedScript: EditorScript = {
      ...script,
      form: script.form.map((field) => {
        if (basicValues[field.id]) {
          return {
            ...field,
            value: basicValues[field.id],
          };
        }
        return field;
      }),
    };

    // Convert scenarios array to object format for saving
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
  };

  // Don't render if we don't have the required data
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
          <BasicInfoEditor basicFields={basicFields} values={basicValues} onChange={handleBasicChange} />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioEditor
            scenarios={scenarios}
            scenarioFields={scenarioFields}
            values={scenarioValues}
            onChange={handleScenarioChange}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={handleSave} variant="outline">
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
}
