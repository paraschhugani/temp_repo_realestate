import { useState, useEffect, useMemo } from "react"
import { AIModelService } from "@/services/ai-model-service"

export function useAudioPlayer(voice_id : string) {
  const [isSpeakerLoading, setIsSpeakerLoading] = useState("");
  const [isSpeakerPlaying, setIsSpeakerPlaying] = useState("");
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const aiModelService = useMemo(() => new AIModelService(), []);

  useEffect(() => {
    return () => {
      if (audioElement) {
        aiModelService.stopAudio(audioElement);
      }
    };
  }, [audioElement, aiModelService]);

  const handleAudioToggle = async (message: string) => {
    setIsSpeakerLoading(message);
 
    if (playingAudio === message) {
      if (audioElement) {
        aiModelService.stopAudio(audioElement);
        setAudioElement(null);
      }
      setPlayingAudio(null);
      setIsSpeakerPlaying("");
      setIsSpeakerLoading("");
      return;
    }
    
    if (audioElement) {
      aiModelService.stopAudio(audioElement);
      setAudioElement(null);
    }
  
    setIsSpeakerPlaying(message);
    
    try {
      const audioBlob = await aiModelService.textToSpeech(message, voice_id);
      const newAudioElement = await aiModelService.playAudio(audioBlob);
    
      setAudioElement(newAudioElement);
      setPlayingAudio(message);
      
      newAudioElement.addEventListener('ended', () => {
        setPlayingAudio(null);
        setAudioElement(null);
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
    } finally {
      setIsSpeakerLoading("");
    }
  };

  return {
    handleAudioToggle,
    isSpeakerLoading,
    playingAudio,
    isSpeakerPlaying
  };
} 