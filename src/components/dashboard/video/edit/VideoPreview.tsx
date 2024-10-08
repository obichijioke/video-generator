import React, { useEffect, useState, useMemo } from 'react';
import { HelpCircle, Maximize2, Pause, Repeat, Rewind, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoSize } from '@/app/dashboard/video/edit/[id]/page';
import { Scene } from '@/app/dashboard/video/edit/[id]/page';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Player, PlayerRef } from '@remotion/player';
import { VideoComposition } from './VideoComposition';

interface VideoPreviewProps {
  scenes: Scene[];
  selectedScene: Scene;
  videoSize: VideoSize;
  onVideoSizeChange: (size: VideoSize) => void;
}

export function VideoPreview({ scenes, selectedScene, videoSize, onVideoSizeChange }: VideoPreviewProps) {
  const [playerRef, setPlayerRef] = useState<PlayerRef>();
  const [key, setKey] = useState(0);

  const getVideoSizeClass = () => {
    switch (videoSize) {
      case '16:9':
        return 'aspect-[16/9]';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const fps = 30;
  const sceneDuration = 9; // 9 seconds per scene
  const durationInFrames = Math.max(scenes.length * sceneDuration * fps, 1); // Ensure at least 1 frame

  const { compositionWidth, compositionHeight } = useMemo(() => {
    switch (videoSize) {
      case '16:9':
        return { compositionWidth: 1920, compositionHeight: 1080 };
      case '4:3':
        return { compositionWidth: 1440, compositionHeight: 1080 };
      case '1:1':
        return { compositionWidth: 1080, compositionHeight: 1080 };
      default:
        return { compositionWidth: 1920, compositionHeight: 1080 };
    }
  }, [videoSize]);

  useEffect(() => {
    if (playerRef) {
      const sceneIndex = scenes.findIndex((scene) => scene.id === selectedScene.id);
      playerRef.seekTo(sceneIndex * sceneDuration * fps);
    }
  }, [selectedScene, playerRef, scenes, sceneDuration, fps]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [videoSize]);

  return (
    <div className="rounded-lg shadow flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Total duration: {Math.max(scenes.length * sceneDuration, 1)}s</span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 w-auto">Size</p>
          <Select value={videoSize} onValueChange={(value) => onVideoSizeChange(value as VideoSize)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a video size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
                <SelectItem value="1:1">1:1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10 lg:h-[600px] lg:w-[600px] flex items-center justify-center mx-auto">
        <div className={`w-full h-full ${getVideoSizeClass()}`}>
          {scenes.length > 0 ? (
            <Player
              key={key}
              ref={(ref) => setPlayerRef(ref ?? undefined)}
              component={VideoComposition}
              inputProps={{ scenes, fps, durationInFrames, videoSize }}
              durationInFrames={durationInFrames}
              fps={fps}
              compositionWidth={compositionWidth}
              compositionHeight={compositionHeight}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No scenes available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
