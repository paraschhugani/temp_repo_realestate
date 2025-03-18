"use client"

import { useState, useEffect, useCallback, useMemo, useRef, use as useHook } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import {
  ArrowRight,
  Loader2,
  User,
  MessageSquare,
  GitBranch,
  BotIcon as Bot2,
  Play,
  Pause,
  Phone,
  Bot,
  ChevronDown,
} from "lucide-react"
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, Node } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AIModelService } from "@/services/ai-model-service"
import { CampaignService } from "@/services/campaign-service"
import { useAuth } from "@clerk/nextjs"
import { toastService } from "@/services/toast-service"

const NODE_WIDTH = 200
const NODE_HEIGHT = 100
const HORIZONTAL_SPACING = 250
const VERTICAL_SPACING = 150

const calculateNodePosition = (level: number, index: number, totalNodesInLevel: number) => {
  const y = level * VERTICAL_SPACING
  const levelWidth = (totalNodesInLevel - 1) * HORIZONTAL_SPACING
  const x = index * HORIZONTAL_SPACING - levelWidth / 2
  return { x, y }
}

const createTreeStructure = (nodes: any[]) => {
  const tree: { [key: string]: any[] } = {}
  const root = nodes.find((n) => n.type === "input")
  if (!root) return tree
  const build = (node: any, level: number) => {
    if (!tree[level]) tree[level] = []
    tree[level].push(node)
    const children = nodes.filter((n) =>
      initialEdges.some((edge) => edge.source === node.id && edge.target === n.id)
    )
    children.forEach((child) => build(child, level + 1))
  }
  build(root, 0)
  return tree
}

const initialNodesData = [
  { id: "n1", type: "input", data: { label: "Greeting & Introduction:\n\"Hello, may I speak with [Customer Name]? Hi [Customer Name], this is [Agent Name] from Otto AI. Thank you for filling out our 'Book a Meeting' form.\"" } },
  { id: "n2", data: { label: "What is your estimated annual income?" } },
  { id: "n2a", data: { label: "$200,000" } },
  { id: "n2b", data: { label: "I'm not sure" } },
  { id: "n2c", data: { label: "$150,000" } },
  { id: "n3", data: { label: "Which tax year did you last file?" } },
  { id: "n3a", data: { label: "2022" } },
  { id: "n3b", data: { label: "I think it was 2022, but I'm not certain" } },
  { id: "n4", data: { label: "Do you have an LLC? If so, can you share some details?" } },
  { id: "n4a", data: { label: "Yes, I do—incorporated in Delaware" } },
  { id: "n4b", data: { label: "Yes, I do have an LLC, but I'm not sure about the details" } },
  { id: "n5", data: { label: "When do you plan to get started?" } },
  { id: "n5a", data: { label: "Next month" } },
  { id: "n6", data: { label: "Can you tell me a little about your business?" } },
  { id: "n6a", data: { label: "We're a small e-commerce startup in fashion" } },
  { id: "n7", data: { label: "Thank you. Let me repeat: Your estimated income is [answer], you filed taxes for [answer], you [have/do not have] an LLC, and you're planning to start [if applicable]. Is that correct?" } },
  { id: "n7a", data: { label: "Yes, that's correct" } },
  { id: "n8", data: { label: "Great. You will meet with [Otto AI Team Member] on [Meeting Date] at [Meeting Time]. Correct?" } },
  { id: "n8a", data: { label: "Yes, that's right" } },
  { id: "n9", data: { label: "Any other questions?" } },
  { id: "n9a", data: { label: "No, that's all" } },
  { id: "n10", type: "output", data: { label: "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!" } },
  { id: "nA3", data: { label: "Thank you. Your meeting is scheduled for [Meeting Date] at [Meeting Time]. Is that correct?" } },
  { id: "nA3a", data: { label: "Actually, can we do a different date/time? That slot doesn't work for me anymore" } },
  { id: "nA3b", data: { label: "Of course. Let me adjust that. What day or time would work better?" } },
  { id: "nA3c", data: { label: "How about next Tuesday at 2 PM?" } },
  { id: "nA3d", data: { label: "Perfect. So now your meeting is on next Tuesday at 2 PM, is that correct?" } },
  { id: "nA3e", data: { label: "Yes, that works great" } },
  { id: "nA3f", data: { label: "Excellent. I've updated your appointment. Any other questions?" } },
  { id: "nA3g", data: { label: "No, that's all" } },
  { id: "nA3h", data: { label: "Great. Thank you, [Customer Name]. We look forward to speaking with you next Tuesday. Have a great day!" } },
]

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", animated: true },
  { id: "e2-2a", source: "n2", target: "n2a", animated: true },
  { id: "e2-2b", source: "n2", target: "n2b", animated: true },
  { id: "e2-2c", source: "n2", target: "n2c", animated: true },
  { id: "e2a-3", source: "n2a", target: "n3", animated: true },
  { id: "e2b-3", source: "n2b", target: "n3", animated: true },
  { id: "e2c-A3", source: "n2c", target: "nA3", animated: true },
  { id: "e3-3a", source: "n3", target: "n3a", animated: true },
  { id: "e3-3b", source: "n3", target: "n3b", animated: true },
  { id: "e3a-4", source: "n3a", target: "n4", animated: true },
  { id: "e3b-4", source: "n3b", target: "n4", animated: true },
  { id: "e4-4a", source: "n4", target: "n4a", animated: true },
  { id: "e4-4b", source: "n4", target: "n4b", animated: true },
  { id: "e4a-5", source: "n4a", target: "n5", animated: true },
  { id: "e5-5a", source: "n5", target: "n5a", animated: true },
  { id: "e5a-6", source: "n5a", target: "n6", animated: true },
  { id: "e6-6a", source: "n6", target: "n6a", animated: true },
  { id: "e6a-7", source: "n6a", target: "n7", animated: true },
  { id: "e4b-7", source: "n4b", target: "n7", animated: true },
  { id: "e7-7a", source: "n7", target: "n7a", animated: true },
  { id: "e7a-8", source: "n7a", target: "n8", animated: true },
  { id: "e8-8a", source: "n8", target: "n8a", animated: true },
  { id: "e8a-9", source: "n8a", target: "n9", animated: true },
  { id: "e9-9a", source: "n9", target: "n9a", animated: true },
  { id: "e9a-10", source: "n9a", target: "n10", animated: true },
  { id: "eA3-A3a", source: "nA3", target: "nA3a", animated: true },
  { id: "eA3a-A3b", source: "nA3a", target: "nA3b", animated: true },
  { id: "eA3b-A3c", source: "nA3b", target: "nA3c", animated: true },
  { id: "eA3c-A3d", source: "nA3c", target: "nA3d", animated: true },
  { id: "eA3d-A3e", source: "nA3d", target: "nA3e", animated: true },
  { id: "eA3e-A3f", source: "nA3e", target: "nA3f", animated: true },
  { id: "eA3f-A3g", source: "nA3f", target: "nA3g", animated: true },
  { id: "eA3g-A3h", source: "nA3g", target: "nA3h", animated: true },
]

const FlowDiagram = ({ activeScenario }: { activeScenario: string }) => {
  const getNodeColor = useCallback((nodeId: string, scenario: string) => {
    if (scenario === "A1") return nodeId === "n2a" || nodeId === "n4a" ? "#34D399" : "#60A5FA"
    if (scenario === "A2") return nodeId === "n2b" || nodeId === "n4b" ? "#34D399" : "#60A5FA"
    if (scenario === "A3") return nodeId === "n2c" ? "#34D399" : "#60A5FA"
    return "#60A5FA"
  }, [])

  const getBorderStyle = useCallback((nodeId: string, scenario: string) => {
    if (scenario === "A1" && (nodeId === "n2a" || nodeId === "n4a")) return "2px solid #059669"
    if (scenario === "A2" && (nodeId === "n2b" || nodeId === "n4b")) return "2px solid #059669"
    if (scenario === "A3" && nodeId === "n2c") return "2px solid #059669"
    return "1px solid #3B82F6"
  }, [])

  const treeStructure = useMemo(() => createTreeStructure(initialNodesData), [])
  const computedNodes = useMemo(() => {
    return initialNodesData.map((node) => {
      const levelKey = Object.keys(treeStructure).find((key) =>
        treeStructure[key].some((n: Node) => n.id === node.id)
      )
      if (!levelKey) return { ...node }
      const index = treeStructure[levelKey].findIndex((n: Node) => n.id === node.id)
      const position = calculateNodePosition(Number(levelKey), index, treeStructure[levelKey].length)
      return {
        ...node,
        position,
        style: {
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
          background: getNodeColor(node.id, activeScenario),
          border: getBorderStyle(node.id, activeScenario),
          padding: 10,
          borderRadius: 5,
          fontSize: 12,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }
    })
  }, [activeScenario, getNodeColor, getBorderStyle, treeStructure])

  const [nodes, setNodes, onNodesChange] = useNodesState(computedNodes as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const updatedNodes = (computedNodes as Node[]).map(node => ({
      ...node,
      position: node.position || { x: 0, y: 0 },
      style: node.style || {
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        background: 'defaultColor',
        border: 'defaultBorder',
        padding: 10,
        borderRadius: 5,
        fontSize: 12,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }))
    setNodes(updatedNodes)
  }, [activeScenario, computedNodes, setNodes])

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  )
}

const ScenarioContent = ({ scenario, selectedVoiceModel }: { scenario: any, selectedVoiceModel: string }) => {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const aiModelService = useMemo(() => new AIModelService(), [])
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!animatedRef.current) {
      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev >= scenario.content.length) {
            clearInterval(timer)
            animatedRef.current = true
            return prev
          }
          return prev + 1
        })
      }, 500)
      return () => clearInterval(timer)
    } else {
      setVisibleMessages(scenario.content.length)
    }
  }, [scenario.content.length])

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioElement) {
        aiModelService.stopAudio(audioElement);
      }
    };
  }, [audioElement, aiModelService]);

  const handleAudioToggle = async (message: string) => {
    // If already playing this message, stop it
    if (playingAudio === message) {
      if (audioElement) {
        aiModelService.stopAudio(audioElement);
        setAudioElement(null);
      }
      setPlayingAudio(null);
      return;
    }
    
    // If playing a different message, stop it first
    if (audioElement) {
      aiModelService.stopAudio(audioElement);
      setAudioElement(null);
    }
    
    // Start loading state
    setIsLoading(message);
    
    try {
      
      const audioBlob = await aiModelService.textToSpeech(message, selectedVoiceModel);
      
    
      const newAudioElement = await aiModelService.playAudio(audioBlob);
    
      setAudioElement(newAudioElement);
      setPlayingAudio(message);
      
      // Set up ended event to reset state
      newAudioElement.addEventListener('ended', () => {
        setPlayingAudio(null);
        setAudioElement(null);
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4 bg-gray-50">
      <div className="space-y-4">
        <AnimatePresence>
          {scenario.content.slice(0, visibleMessages).map((msg: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.role === "customer" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`rounded-full p-1.5 ${msg.role === "customer" ? "bg-green-500" : "bg-blue-500"}`}>
                  {msg.role === "customer" ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot2 className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-2 ${msg.role === "customer" ? "bg-green-100 text-right" : "bg-blue-100"}`}>
                  <div className="flex items-center space-x-2">
                    {msg.role === "agent" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0.5 h-auto hover:bg-blue-200 transition-colors duration-200"
                              onClick={() => handleAudioToggle(msg.message)}
                            >
                              {isLoading === msg.message ? (
                                <Loader2 className="h-3 w-3 text-blue-500 animate-spin" />
                              ) : playingAudio === msg.message ? (
                                <Pause className="h-3 w-3 text-blue-500" />
                              ) : (
                                <Play className="h-3 w-3 text-blue-500" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isLoading === msg.message 
                                ? "Loading audio..." 
                                : playingAudio === msg.message 
                                  ? "Pause" 
                                  : "Play"} audio
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <p className="text-xs">{msg.message}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}

const scenarios = [
  {
    id: "A1",
    title: "Smooth, Complete Information",
    content: [
      { role: "agent", message: "Hello, may I speak with [Customer Name]? Hi [Customer Name], this is [Agent Name] from Otto AI. Thank you for filling out our 'Book a Meeting' form." },
      { role: "customer", message: "yes" },
      { role: "agent", message: "Great! I'm calling to collect a few details before your demo. This helps us set the scope and pricing. What is your estimated annual income?" },
      { role: "customer", message: "$200,000." },
      { role: "agent", message: "Thank you. Which tax year did you last file?" },
      { role: "customer", message: "2022" },
      { role: "agent", message: "Do you have an LLC? If so, can you share some details?" },
      { role: "customer", message: "Yes, I do—incorporated in Delaware." },
      { role: "agent", message: "When do you plan to get started?" },
      { role: "customer", message: "Next month." },
      { role: "agent", message: "Can you tell me a little about your business?" },
      { role: "customer", message: "We're a small e-commerce startup in fashion." },
      { role: "agent", message: "Thank you. Let me repeat: Your estimated income is $200,000, you filed taxes for 2022, you do have an LLC, and you're planning to start next month. Is that correct?" },
      { role: "customer", message: "Yes, that's correct." },
      { role: "agent", message: "Great. You will meet with [Otto AI Team Member] on [Meeting Date] at [Meeting Time]. Correct?" },
      { role: "customer", message: "Yes, that's right." },
      { role: "agent", message: "Any other questions?" },
      { role: "customer", message: "No, that's all." },
      { role: "agent", message: "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!" },
    ],
  },
  {
    id: "A2",
    title: "Customer Unsure About Details",
    content: [
      { role: "agent", message: "Hello, may I speak with [Customer Name]? Hi [Customer Name], this is [Agent Name] from Otto AI. Thank you for filling out our 'Book a Meeting' form." },
      { role: "customer", message: "Hi [Agent Name], yes, this is [Customer Name]. Thanks for reaching out." },
      { role: "agent", message: "I'm calling to collect a few details before your demo. This helps us set the scope and pricing. What is your estimated annual income?" },
      { role: "customer", message: "I'm not sure." },
      { role: "agent", message: "No worries, we can discuss that during your demo. Let's move on to the next question. Which tax year did you last file?" },
      { role: "customer", message: "I need to confirm my last tax year filed. I think it was 2022, but I'm not certain." },
      { role: "agent", message: "That's okay. We can clarify that during the demo as well." },
      { role: "customer", message: "Yes, I do have an LLC, but I'm not sure about the details." },
      { role: "agent", message: "Thank you for sharing what you know. We'll go over the specifics during your demo." },
      { role: "agent", message: "You mentioned you're unsure about some details, but that's okay—we'll clarify during the demo. Your meeting is scheduled for [Meeting Date] at [Meeting Time]. Is that correct?" },
      { role: "customer", message: "Yes, that's correct." },
      { role: "agent", message: "Great. Any other questions?" },
      { role: "customer", message: "No, that's all for now." },
      { role: "agent", message: "Thank you, [Customer Name]. We look forward to speaking with you soon and clarifying all the details. Have a great day!" },
    ],
  },
  {
    id: "A3",
    title: "Customer Wants to Reschedule",
    content: [
      { role: "agent", message: "Hello, may I speak with [Customer Name]? Hi [Customer Name], this is [Agent Name] from Otto AI. Thank you for filling out our 'Book a Meeting' form." },
      { role: "customer", message: "Hello [Agent Name], yes, this is [Customer Name]. Thanks for calling." },
      { role: "agent", message: "Great! I'm calling to collect a few details before your demo. This helps us set the scope and pricing. What is your estimated annual income?" },
      { role: "customer", message: "My estimated annual income is around $150,000." },
      { role: "agent", message: "Thank you. Your meeting is scheduled for [Meeting Date] at [Meeting Time]. Is that correct?" },
      { role: "customer", message: "Actually, can we do a different date/time? That slot doesn't work for me anymore." },
      { role: "agent", message: "Of course. Let me adjust that. What day or time would work better?" },
      { role: "customer", message: "How about next Tuesday at 2 PM?" },
      { role: "agent", message: "Perfect. So now your meeting is on next Tuesday at 2 PM, is that correct?" },
      { role: "customer", message: "Yes, that works great." },
      { role: "agent", message: "Excellent. I've updated your appointment. Any other questions?" },
      { role: "customer", message: "No, that's all." },
      { role: "agent", message: "Great. Thank you, [Customer Name]. We look forward to speaking with you next Tuesday. Have a great day!" },
    ],
  },
]

interface ConfigureAIAgentProps {
  params: Promise<{ useCase: string }>
}

export default function ConfigureAIAgent({ params }: ConfigureAIAgentProps) {
  const resolvedParams = useHook(params)
  const { useCase } = resolvedParams
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id)
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [voiceModel, setVoiceModel] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")
  const [backgroundSound, setBackgroundSound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingAgent, setIsTestingAgent] = useState(false)
  const router = useRouter()
  const configSectionRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const [showScrollButton, setShowScrollButton] = useState(true)
  const { getToken, userId } = useAuth()
  const campaignService = useMemo(() => new CampaignService(), [])
  const [voiceModelList, setVoiceModelList] = useState<Record<string, any>>({})

  useEffect(() => {
    animate(scope.current, { y: [0, 5, 0] }, { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" })
  }, [animate, scope])


  useEffect(() => {
    const fetchVoiceModelList = async () => {
      try {
        const token = await getToken();
        const voiceModelList = await new AIModelService().getVoiceModelList(token ?? "");
        setVoiceModelList(voiceModelList);
      } catch (error) {
        console.error("Error fetching voice models:", error);
        toastService.error("Failed to load voice models");
      }
    }
    fetchVoiceModelList();
  }, [getToken])

  const handleTestAgent = async () => {
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
    
    try {
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
      

    } catch (error) {
      console.error("Error testing agent:", error);
    } finally {
      setIsTestingAgent(false);
    }
  }

  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const resizeEvent = new Event("resize")
    window.dispatchEvent(resizeEvent)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const configSection = configSectionRef.current
      if (configSection) {
        const configSectionTop = configSection.offsetTop
        setShowScrollButton(scrollPosition < configSectionTop - 100)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits, spaces, dashes, parentheses, and plus sign
    const formattedValue = value.replace(/[^\d\s\-\(\)\+]/g, '');
    setPhoneNumber(formattedValue);
    
  
    const digitsOnly = formattedValue.replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      setPhoneNumberError("Phone number must have at least 10 digits");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSaveAndContinue = async () => {
  
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setPhoneNumberError("Please enter a valid phone number with at least 10 digits");
      configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push(`/launch/${useCase}/audience`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-2 sm:px-4 lg:px-6">
      <div className="max-w-full mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold">Configure Your AI Agent</h1>
         <div className="flex items-center gap-4">
         <div className="">
                  {/* <Label htmlFor="phone-number">Phone Number</Label> */}
                  <Input 
                    id="phone-number" 
                    type="tel" 
                    placeholder="Enter phone number" 
                    value={phoneNumber} 
                    onChange={handlePhoneNumberChange}
                    className={`mt-1 ${phoneNumberError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                  {phoneNumberError && (
                    <p className="text-red-500 text-xs mt-1">{phoneNumberError}</p>
                  )}
                </div>
            <Button 
              onClick={handleTestAgent} 
              className="bg-black hover:bg-gray-800 text-white rounded px-6 py-3 text-lg transition-colors duration-300"
              disabled={isTestingAgent}
            >
              {isTestingAgent ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initiating call...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-2" />
                  Test
                </>
              )}
            </Button>
         </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-6">
              <div className="flex-1 flex flex-col ">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageSquare className="mr-2" /> Scenarios
                </h2>
                <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-md">
                    {scenarios.map((scenario) => (
                      <TabsTrigger key={scenario.id} value={scenario.id} className={`text-sm ${activeScenario === scenario.id ? 'bg-white' : 'bg-transparent'}`}>
                        <span className="truncate max-w-[150px]" title={scenario.title}>
                          {scenario.title.length > 25 ? scenario.title.slice(0, 25) + "..." : scenario.title}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {scenarios.map((scenario) => (
                    <TabsContent key={scenario.id} value={scenario.id} className="mt-4">
                      <ScenarioContent scenario={scenario} selectedVoiceModel={voiceModel} />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              <div className="flex-1 ">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <GitBranch className="mr-2" /> Conversation Flow
                </h2>
                <FlowDiagram activeScenario={activeScenario} />
              </div>
            </div>
            <div ref={configSectionRef} className="p-6 border-t border-gray-200 ">
              <h2 className="text-xl font-semibold mb-4">Voice AI Configuration</h2>
              <div className="space-y-6">
               
                <div>
                  <Label htmlFor="voice-model">Voice Model</Label>
                  <Select value={voiceModel} onValueChange={setVoiceModel}>
                    <SelectTrigger id="voice-model">
                      <SelectValue placeholder="Select a voice model" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {Object.entries(voiceModelList).map(([id, details]) => {
                        const voiceDetails = details as any;
                      
                        const accent = voiceDetails.Accent || "";
                        const gender = voiceDetails.Gender || "";
                        const name = voiceDetails["Name "] || `Voice ${id.substring(0, 6)}`;
                        return (
                          <SelectItem key={id} value={id}>
                            {`${accent} - ${gender} - ${name}`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="voice-speed">Voice Speed: {voiceSpeed}x</Label>
                  <Slider id="voice-speed" min={0.5} max={2} step={0.1} value={[voiceSpeed]} onValueChange={(value) => setVoiceSpeed(value[0])} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="background-sound" checked={backgroundSound} onCheckedChange={setBackgroundSound} />
                  <Label htmlFor="background-sound">Enable Background Sound</Label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleSaveAndContinue} className="w-full bg-black hover:bg-gray-800 text-white rounded px-6 py-3 text-base transition-colors duration-300">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Save and Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to save your AI agent configuration and continue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
      </div>
      {showScrollButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={scrollToConfig} className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700" size="sm">
                  <Bot className="mr-1 h-4 w-4" />
                  Config Voice
                  <ChevronDown ref={scope} className="ml-1 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Scroll to voice configuration</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  )
}
