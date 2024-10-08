export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(new MediaStream());
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      mediaStreamSource.connect(mediaStreamDestination);

      const recorder = new MediaRecorder(mediaStreamDestination.stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          resolve(fileReader.result as ArrayBuffer);
        };
        fileReader.readAsArrayBuffer(audioBlob);
      };

      recorder.start();
      speechSynthesis.speak(utterance);
    };

    utterance.onerror = (error) => {
      reject(error);
    };
  });
}
