import { User, Bot, Loader2, Pause, Play, Headset, Volume2 } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface ChatMessageProps {
  message: {
    speaker: string
    content?: string
  }
  onAudioToggle?: (content: string) => void
  isSpeakerLoading?: string
  playingAudio?: string | null
}

export function ChatMessage({ message, onAudioToggle, isSpeakerLoading, playingAudio }: ChatMessageProps) {
  return (
    <div className={`flex ${message.speaker === "customer" ? "justify-end ml-2" : "justify-start"}`}>
      <div
        className={`flex items-start space-x-2.5 max-w-[80%] ${
          message.speaker === "customer" ? "flex-row-reverse space-x-reverse" : "flex-row"
        }`}
      >
        <div
          className={`rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer ${
            message.speaker === "customer" 
              ? "bg-green-500 h-8 w-8" 
              : "bg-white border-[1.5px] border-blue-100/60 shadow-sm"
          }`}
        >
          {message.speaker === "customer" ? (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <User className="h-4 w-4 text-white" />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-indigo-500 text-white border-none shadow-lg">
                  <p>
                    Customer                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="relative w-[28px] h-[28px] flex items-center justify-center">
             <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <img src="/images/u_logo.png" alt="logo" className="w-full h-full object-contain" />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-indigo-500 text-white border-none shadow-lg">
                  <p>
                    Agent                  </p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
             
          </div>
          )}
        </div>
        <div
          className={`rounded-lg p-3.5 relative min-w-[80px] ${
            message.speaker === "customer" 
              ? "bg-green-100 text-right" 
              : "bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm border border-blue-100/40"
          }`}
        >
          <p className="text-sm leading-relaxed text-gray-800">{message.content}</p>
          {message.speaker === "agent" && onAudioToggle && message.content && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0.5 h-8 w-8 hover:bg-blue-100 bg-white border-blue-500 absolute -bottom-2 -right-2 rounded-full shadow-md flex items-center justify-center border  transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    onClick={() => message.content && onAudioToggle(message.content)}
                  >
                    {isSpeakerLoading === message.content ? (
                      <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                    ) : playingAudio === message.content ? (
                      <Pause className="h-3.5 w-3.5 text-blue-500" />
                    ) : (
                      <Play className="h-3.5 w-3.5 text-blue-500 translate-x-[1px]" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-indigo-500 text-white border-none shadow-lg">
                  <p>
                    {isSpeakerLoading === message.content 
                      ? "Loading audio..." 
                      : playingAudio === message.content 
                        ? "Pause" 
                        : "Play"} audio
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  )
} 