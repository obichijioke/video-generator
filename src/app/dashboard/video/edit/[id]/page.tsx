'use client';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/dashboard/video/edit/Sidebar';
import { SceneList } from '@/components/dashboard/video/edit/SceneList';
import { VideoPreview } from '@/components/dashboard/video/edit/VideoPreview';
import { Timeline } from '@/components/dashboard/video/edit/Timeline';
import { browserTTS, elevenlabsTTS, googleTTS, TTSService } from '@/utils/ttsServices';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export interface Scene {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  audio?: ArrayBuffer;
}

export type VideoSize = '16:9' | '4:3' | '1:1';

export default function EditVideo() {
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 1,
      title: 'Scene 1',
      content: "INTRODUCTION: In this video, we'll explore five lucrative ways for video creators to make money.",
      thumbnail: 'https://picsum.photos/800/600',
    },
    {
      id: 2,
      title: 'Scene 2',
      content:
        "Whether you're a YouTuber, filmmaker, or content creator, these strategies can help you turn your passion into a profitable venture.",
      thumbnail: 'https://picsum.photos/800/600',
    },
    { id: 3, title: 'Scene 3', content: '1.', thumbnail: 'https://picsum.photos/800/600' },
    {
      id: 4,
      title: 'Scene 4',
      content: 'YouTube Monetization',
      thumbnail: 'https://picsum.photos/800/600',
    },
    {
      id: 5,
      title: 'Scene 5',
      content:
        'YouTube is one of the most popular platforms for video creators, and it offers several ways to monetize your content:',
      thumbnail: 'https://picsum.photos/800/600',
    },
    { id: 6, title: 'Scene 6', content: 'a. Ad Revenue:', thumbnail: 'https://picsum.photos/800/600' },
    {
      id: 7,
      title: 'Scene 7',
      content: '1. Enable ads on your videos and earn a share of the ad revenue generated from viewers.',
      thumbnail: 'https://picsum.photos/900/600',
    },
    {
      id: 8,
      title: 'Scene 8',
      content:
        "2. Qualify for YouTube's Partner Program by meeting the minimum requirements for watch time and subscribers.",
      thumbnail: 'https://picsum.photos/700/600',
    },
  ]);

  const [selectedScene, setSelectedScene] = useState(scenes[0]);
  const [videoSize, setVideoSize] = useState<VideoSize>('16:9');
  const [ttsService, setTTSService] = useState<TTSService>('browser');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [currentGeneratingScene, setCurrentGeneratingScene] = useState<number | null>(null);

  const generateAudioForScene = useCallback(
    async (scene: Scene) => {
      const ttsFunction =
        ttsService === 'elevenlabs' ? elevenlabsTTS : ttsService === 'google' ? googleTTS : browserTTS;

      try {
        setIsGeneratingAudio(true);
        setCurrentGeneratingScene(scene.id);
        const audio = await ttsFunction(scene.content);
        setScenes((prevScenes) => prevScenes.map((s) => (s.id === scene.id ? { ...s, audio } : s)));
        setSelectedScene((prevScene) => (prevScene.id === scene.id ? { ...prevScene, audio } : prevScene));
      } catch (error) {
        console.error(`Failed to generate audio for scene ${scene.id}:`, error);
      } finally {
        setIsGeneratingAudio(false);
        setCurrentGeneratingScene(null);
      }
    },
    [ttsService],
  );

  const generateAllAudio = useCallback(async () => {
    setIsGeneratingAudio(true);
    for (const scene of scenes) {
      await generateAudioForScene(scene);
    }
    setIsGeneratingAudio(false);
  }, [scenes, generateAudioForScene]);

  const handleSceneUpdate = useCallback((id: number, newContent: string) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) => (scene.id === id ? { ...scene, content: newContent, audio: undefined } : scene)),
    );
    setSelectedScene((prevScene) =>
      prevScene.id === id ? { ...prevScene, content: newContent, audio: undefined } : prevScene,
    );
  }, []);

  const handleSceneSelect = useCallback((scene: Scene) => {
    setSelectedScene(scene);
  }, []);

  const handleVideoSizeChange = useCallback((size: VideoSize) => {
    setVideoSize(size);
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 flex space-x-6">
          <SceneList
            scenes={scenes}
            selectedScene={selectedScene}
            onSceneSelect={handleSceneSelect}
            onSceneUpdate={handleSceneUpdate}
          />
          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex items-center space-x-4">
              <Select value={ttsService} onValueChange={(value) => setTTSService(value as TTSService)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select TTS Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="browser">Browser TTS</SelectItem>
                  <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                  <SelectItem value="google">Google Cloud TTS</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => generateAudioForScene(selectedScene)}
                disabled={isGeneratingAudio}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isGeneratingAudio && currentGeneratingScene === selectedScene.id ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Audio...
                  </div>
                ) : (
                  'Generate Audio for Scene'
                )}
              </button>
              <button
                onClick={generateAllAudio}
                disabled={isGeneratingAudio}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
              >
                {isGeneratingAudio ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating All Audio...
                  </div>
                ) : (
                  'Generate All Audio'
                )}
              </button>
            </div>
            <VideoPreview
              scenes={scenes}
              selectedScene={selectedScene}
              videoSize={videoSize}
              onVideoSizeChange={handleVideoSizeChange}
            />
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}
