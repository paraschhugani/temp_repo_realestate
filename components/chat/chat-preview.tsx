import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { SelectValue } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, Select } from "../ui/select"
import { Label } from "../ui/label"

interface Message {
  speaker: string
  content?: string
  fieldId?: string
}

interface ChatPreviewProps {
  messages: Message[]
  onAudioToggle?: (content: string) => void
  isSpeakerLoading?: string
  playingAudio?: string | null,
  setVoiceModel?: (voiceModel: string) => void
  voiceModel?: string
  voiceModelList : Record<string, any>
}

export function ChatPreview({ messages, onAudioToggle, isSpeakerLoading, playingAudio, setVoiceModel, voiceModelList, voiceModel }: ChatPreviewProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 ">Conversation Preview</h3>
      <div className="h-[1px] bg-gray-200"></div>
      {/* <div className="flex flex-col gap-2 my-4">
                  <Label htmlFor="voice-model" className="text-sm text-gray-500 ">Choose a voice model</Label>
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
                </div> */}
      <Card>
        <CardContent className="p-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  onAudioToggle={onAudioToggle}
                  isSpeakerLoading={isSpeakerLoading}
                  playingAudio={playingAudio}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
} 