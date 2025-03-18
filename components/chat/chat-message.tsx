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
        className={`flex items-start space-x-2 max-w-[80%] ${
          message.speaker === "customer" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`rounded-full p-2 ${
            message.speaker === "customer" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {message.speaker === "customer" ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Headset className="h-3.5 w-3.5 text-white" />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            message.speaker === "customer" ? "bg-green-100 text-right" : "bg-blue-100"
          }`}
        >
          {message.speaker === "agent" && onAudioToggle ? (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0.5 h-auto hover:bg-blue-200 transition-colors duration-200"
                      onClick={() => message.content && onAudioToggle(message.content)}
                    >
                      {isSpeakerLoading === message.content ? (
                        <Loader2 className="h-3 w-3 text-black animate-spin" />
                      ) : playingAudio === message.content ? (
                        <Pause className="h-3 w-3 text-black" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
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
              <p className="text-sm">{message.content}</p>
            </div>
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  )
} 