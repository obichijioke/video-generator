import { Composition } from 'remotion';
import { Scene } from './Scene';

interface VideoCompositionProps {
  scenes: Array<{
    id: string;
    content: string;
    media_url?: string | null;
  }>;
  currentSceneIndex: number;
}

const SCENE_DURATION = 150; // 5 seconds at 30fps

export const VideoComposition: React.FC<VideoCompositionProps> = ({ scenes, currentSceneIndex }) => {
  const currentScene = scenes[currentSceneIndex];

  if (!currentScene) {
    return null;
  }

  return <Scene content={currentScene.content} mediaUrl={currentScene.media_url} />;
};
