import { AbsoluteFill, Sequence } from 'remotion';
import { Scene, VideoSize } from '@/app/dashboard/video/edit/[id]/page';

interface VideoCompositionProps {
  scenes: Scene[];
  fps: number;
  durationInFrames: number;
  videoSize: VideoSize;
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({ scenes, fps, durationInFrames, videoSize }) => {
  const sceneDuration = Math.floor(durationInFrames / scenes.length);

  return (
    <AbsoluteFill>
      {scenes.map((scene, index) => (
        <Sequence key={scene.id} from={index * sceneDuration} durationInFrames={sceneDuration}>
          <AbsoluteFill
            style={{
              backgroundImage: `url(${scene.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white bg-black bg-opacity-50 p-4 rounded">
                <h2 className="text-2xl font-bold mb-2">{scene.title}</h2>
                <p className="text-xl">{scene.content}</p>
              </div>
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
