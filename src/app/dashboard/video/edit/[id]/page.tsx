'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/video/edit/Sidebar';
import { SceneList } from '@/components/dashboard/video/edit/SceneList';
import { VideoPreview } from '@/components/dashboard/video/edit/VideoPreview';
import { Timeline } from '@/components/dashboard/video/edit/Timeline';

interface Scene {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
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

  const handleSceneUpdate = (id: number, newContent: string) => {
    const updatedScenes = scenes.map((scene) => (scene.id === id ? { ...scene, content: newContent } : scene));
    setScenes(updatedScenes);
    if (selectedScene.id === id) {
      setSelectedScene({ ...selectedScene, content: newContent });
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 flex space-x-6">
          <SceneList
            scenes={scenes}
            selectedScene={selectedScene}
            onSceneSelect={setSelectedScene}
            onSceneUpdate={handleSceneUpdate}
          />
          <div className="flex-1 flex flex-col">
            <VideoPreview selectedScene={selectedScene} videoSize={videoSize} onVideoSizeChange={setVideoSize} />
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}
