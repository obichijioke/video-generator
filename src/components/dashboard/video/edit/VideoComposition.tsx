import { AbsoluteFill, Sequence, Audio, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { Scene, VideoSize } from '@/app/dashboard/video/edit/[id]/page';

interface VideoCompositionProps {
  scenes: Scene[];
  fps: number;
  durationInFrames: number;
  videoSize: VideoSize;
}

const AnimatedCaption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div className="absolute bottom-10 left-10 right-10">
      {words.map((word, i) => {
        const delay = i * 5;
        const scale = spring({
          fps,
          frame: frame - delay,
          config: {
            damping: 100,
            stiffness: 200,
            mass: 0.5,
          },
        });

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.2em',
              transform: `scale(${scale})`,
              opacity: scale,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

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
              </div>
            </div>
            <AnimatedCaption text={scene.content} />
            {scene.audio && <Audio src={URL.createObjectURL(new Blob([scene.audio], { type: 'audio/mp3' }))} />}
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
