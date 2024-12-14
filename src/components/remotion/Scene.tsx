import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Poppins';

const { fontFamily } = loadFont();

interface SceneProps {
  content: string;
  mediaUrl?: string | null;
}

export const Scene: React.FC<SceneProps> = ({ content, mediaUrl }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#141414',
        fontFamily,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {mediaUrl && (
        <AbsoluteFill
          style={{
            opacity: opacity * 0.3,
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          width: '80%',
          opacity,
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            color: 'white',
            margin: 0,
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          {content}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
