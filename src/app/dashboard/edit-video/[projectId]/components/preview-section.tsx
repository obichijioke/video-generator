'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Player } from '@remotion/player';
import { VideoComposition } from '@/components/remotion/VideoComposition';

interface Scene {
  id: string;
  scene_number: number;
  content: string;
  media_url: string | null;
}

interface PreviewSectionProps {
  currentSceneIndex: number;
  totalScenes: number;
  onPrevious: () => void;
  onNext: () => void;
  scenes: Scene[];
}

const RemotionComposition = ({ scenes, currentSceneIndex }: { scenes: Scene[]; currentSceneIndex: number }) => {
  return <VideoComposition scenes={scenes} currentSceneIndex={currentSceneIndex} />;
};

export function PreviewSection({ currentSceneIndex, totalScenes, onPrevious, onNext, scenes }: PreviewSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <Player
          component={RemotionComposition}
          durationInFrames={150}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls
          inputProps={{
            scenes,
            currentSceneIndex,
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={currentSceneIndex === 0} onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Play className="mr-2 h-4 w-4" />
          Preview Scene
        </Button>
        <Button variant="outline" size="sm" disabled={currentSceneIndex === totalScenes - 1} onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
