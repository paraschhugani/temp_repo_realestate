import axios from "axios";

interface TextToSpeechRequest {
  text: string;
}

export class AIModelService {
  baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  

  async textToSpeech(text: string, voice_id: string): Promise<Blob> {
    try {
    
      const response = await axios.post(
        `${this.baseURL}/text-to-speech`,
        { text, voice_id},
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
   
      return new Blob([response.data], { type: 'audio/mpeg' });
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("Invalid text input");
      } else if (error.response?.status === 500) {
        throw new Error("Text-to-speech service unavailable");
      } else {
        throw new Error("Failed to convert text to speech");
      }
    }
  }


  playAudio(audioBlob: Blob): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      try {
   
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create an audio element
        const audioElement = new Audio(audioUrl);
        
        // Set up event listeners
        audioElement.addEventListener('ended', () => {
          // Clean up the URL object when done
          URL.revokeObjectURL(audioUrl);
        });
        
        audioElement.addEventListener('error', (e) => {
          URL.revokeObjectURL(audioUrl);
          reject(new Error("Failed to play audio"));
        });
        
        
        audioElement.play()
          .then(() => resolve(audioElement))
          .catch(error => {
            URL.revokeObjectURL(audioUrl);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }


  stopAudio(audioElement: HTMLAudioElement): void {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }

  async getVoiceModelList(token : string) {
      try{
        const response = await axios.get(`${this.baseURL}/get-voice-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        return response.data;
      } catch (error: any) {
       console.error("Failed to get voice model list", error);
      }
  }
} 