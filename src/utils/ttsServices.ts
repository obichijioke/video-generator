import axios from 'axios';

export type TTSService = 'browser' | 'elevenlabs' | 'google';

export async function elevenlabsTTS(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = 'YOUR_VOICE_ID'; // Replace with your chosen voice ID

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text },
    {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    },
  );

  return response.data;
}

export async function googleTTS(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const response = await axios.post(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const audioContent = response.data.audioContent;
  return Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0)).buffer;
}

export async function browserTTS(text: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    let audioContext: AudioContext | null = null;
    let recorder: MediaRecorder | null = null;
    const audioChunks: BlobPart[] = [];

    const cleanup = () => {
      if (recorder && recorder.state !== 'inactive') {
        recorder.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
      speechSynthesis.cancel();
    };

    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Browser TTS timed out'));
    }, 15000); // 15 seconds timeout

    utterance.onend = () => {
      if (recorder) {
        recorder.stop();
      }
    };

    utterance.onerror = (error) => {
      clearTimeout(timeoutId);
      cleanup();
      reject(error);
    };

    try {
      audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      oscillator.connect(mediaStreamDestination);
      oscillator.start();
      oscillator.stop(0.1); // Short duration to ensure we have an audio track

      recorder = new MediaRecorder(mediaStreamDestination.stream);

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        clearTimeout(timeoutId);
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          cleanup();
          resolve(fileReader.result as ArrayBuffer);
        };
        fileReader.onerror = (error) => {
          cleanup();
          reject(error);
        };
        fileReader.readAsArrayBuffer(audioBlob);
      };

      recorder.start();
      speechSynthesis.speak(utterance);
    } catch (error) {
      clearTimeout(timeoutId);
      cleanup();
      reject(error);
    }
  });
}
