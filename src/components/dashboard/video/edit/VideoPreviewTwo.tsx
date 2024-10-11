import { ChevronDown, HelpCircle, Maximize2, Pause, Repeat, Rewind, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoSize } from '@/app/dashboard/video/edit/[id]/page';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Player } from '@revideo/player-react';
import projectVideo from '@/revideo/projectVideo';

interface VideoPreviewTwoProps {
  selectedScene: {
    content: string;
    thumbnail: string;
  };
  videoSize: VideoSize;
  onVideoSizeChange: (size: VideoSize) => void;
}

export function VideoPreviewTwo({ selectedScene, videoSize, onVideoSizeChange }: VideoPreviewTwoProps) {
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

  return (
    <div className="rounded-lg shadow flex flex-col">
      <div className="p-4 flex justify-center items-center">
        <Player
          project={projectVideo}
          controls={true}
          variables={{
            images: sceneData.images,
            audioUrl: sceneData.audioUrl,
            words: sceneData.words,
          }}
          width={600}
          height={450}
        />
      </div>
    </div>
  );
}

const sceneData = {
  audioUrl: 'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/audio.wav',
  images: [
    'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/image-0.png',
    'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/image-1.png',
    'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/image-2.png',
    'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/image-3.png',
    'https://revideo-example-assets.s3.amazonaws.com/12c4cb20-36b8-4ccf-a1bd-7a68b6b47173/image-4.png',
  ],
  words: [
    {
      word: 'ready',
      start: 0.08,
      end: 0.39999998,
      confidence: 0.9988054,
      punctuated_word: 'Ready',
    },
    {
      word: 'to',
      start: 0.39999998,
      end: 0.48,
      confidence: 0.99993455,
      punctuated_word: 'to',
    },
    {
      word: 'have',
      start: 0.48,
      end: 0.71999997,
      confidence: 0.99994206,
      punctuated_word: 'have',
    },
    {
      word: 'your',
      start: 0.71999997,
      end: 0.88,
      confidence: 0.9997631,
      punctuated_word: 'your',
    },
    {
      word: 'mind',
      start: 0.88,
      end: 1.28,
      confidence: 0.99993217,
      punctuated_word: 'mind',
    },
    {
      word: 'blown',
      start: 1.28,
      end: 1.68,
      confidence: 0.99995804,
      punctuated_word: 'blown',
    },
    {
      word: 'by',
      start: 1.68,
      end: 1.8399999,
      confidence: 0.9996729,
      punctuated_word: 'by',
    },
    {
      word: 'the',
      start: 1.8399999,
      end: 2,
      confidence: 0.99946827,
      punctuated_word: 'the',
    },
    {
      word: "world's",
      start: 2,
      end: 2.48,
      confidence: 0.9884629,
      punctuated_word: "world's",
    },
    {
      word: 'largest',
      start: 2.48,
      end: 2.98,
      confidence: 0.9995808,
      punctuated_word: 'largest',
    },
    {
      word: 'volksfest',
      start: 3.04,
      end: 3.54,
      confidence: 0.94936365,
      punctuated_word: 'Volksfest?',
    },
    {
      word: 'welcome',
      start: 4.16,
      end: 4.56,
      confidence: 0.999281,
      punctuated_word: 'Welcome',
    },
    {
      word: 'to',
      start: 4.56,
      end: 4.64,
      confidence: 0.99980026,
      punctuated_word: 'to',
    },
    {
      word: 'the',
      start: 4.64,
      end: 4.7999997,
      confidence: 0.99983585,
      punctuated_word: 'the',
    },
    {
      word: 'heart',
      start: 4.7999997,
      end: 5.04,
      confidence: 0.9977786,
      punctuated_word: 'heart',
    },
    {
      word: 'of',
      start: 5.04,
      end: 5.2,
      confidence: 0.9982095,
      punctuated_word: 'of',
    },
    {
      word: 'munich',
      start: 5.2,
      end: 5.68,
      confidence: 0.99278367,
      punctuated_word: 'Munich,',
    },
    {
      word: 'germany',
      start: 5.68,
      end: 6.16,
      confidence: 0.999559,
      punctuated_word: 'Germany',
    },
    {
      word: 'for',
      start: 6.16,
      end: 6.3999996,
      confidence: 0.8465627,
      punctuated_word: 'for',
    },
    {
      word: 'the',
      start: 6.3999996,
      end: 6.48,
      confidence: 0.99971575,
      punctuated_word: 'the',
    },
    {
      word: 'legendary',
      start: 6.48,
      end: 6.98,
      confidence: 0.99840206,
      punctuated_word: 'legendary',
    },
    {
      word: 'oktoberfest',
      start: 7.3599997,
      end: 7.8599997,
      confidence: 0.9987529,
      punctuated_word: 'Oktoberfest.',
    },
    {
      word: 'imagine',
      start: 8.724999,
      end: 9.045,
      confidence: 0.9981363,
      punctuated_word: 'Imagine',
    },
    {
      word: 'a',
      start: 9.045,
      end: 9.285,
      confidence: 0.99952865,
      punctuated_word: 'a',
    },
    {
      word: 'festival',
      start: 9.285,
      end: 9.764999,
      confidence: 0.99793196,
      punctuated_word: 'festival',
    },
    {
      word: 'stretching',
      start: 9.764999,
      end: 10.245,
      confidence: 0.9995197,
      punctuated_word: 'stretching',
    },
    {
      word: 'over',
      start: 10.245,
      end: 10.485,
      confidence: 0.9997055,
      punctuated_word: 'over',
    },
    {
      word: '18',
      start: 10.485,
      end: 10.884999,
      confidence: 0.9971296,
      punctuated_word: '18',
    },
    {
      word: 'days',
      start: 10.884999,
      end: 11.384999,
      confidence: 0.901999,
      punctuated_word: 'days,',
    },
    {
      word: 'featuring',
      start: 11.684999,
      end: 12.084999,
      confidence: 0.9996741,
      punctuated_word: 'featuring',
    },
    {
      word: 'the',
      start: 12.084999,
      end: 12.245,
      confidence: 0.99989414,
      punctuated_word: 'the',
    },
    {
      word: "world's",
      start: 12.245,
      end: 12.6449995,
      confidence: 0.99881995,
      punctuated_word: "world's",
    },
    {
      word: 'most',
      start: 12.6449995,
      end: 13.125,
      confidence: 0.99981004,
      punctuated_word: 'most',
    },
    {
      word: 'extravagant',
      start: 13.125,
      end: 13.625,
      confidence: 0.9998173,
      punctuated_word: 'extravagant',
    },
    {
      word: 'beer',
      start: 13.764999,
      end: 14.084999,
      confidence: 0.9997545,
      punctuated_word: 'beer',
    },
    {
      word: 'halls',
      start: 14.084999,
      end: 14.584999,
      confidence: 0.99831164,
      punctuated_word: 'halls,',
    },
    {
      word: 'thrilling',
      start: 14.804999,
      end: 15.205,
      confidence: 0.99957234,
      punctuated_word: 'thrilling',
    },
    {
      word: 'fun',
      start: 15.205,
      end: 15.525,
      confidence: 0.9991985,
      punctuated_word: 'fun',
    },
    {
      word: 'rides',
      start: 15.525,
      end: 16.025,
      confidence: 0.99723136,
      punctuated_word: 'rides,',
    },
    {
      word: 'traditional',
      start: 16.28,
      end: 16.78,
      confidence: 0.99739826,
      punctuated_word: 'traditional',
    },
    {
      word: 'bavarian',
      start: 16.84,
      end: 17.320002,
      confidence: 0.99255073,
      punctuated_word: 'Bavarian',
    },
    {
      word: 'music',
      start: 17.320002,
      end: 17.800001,
      confidence: 0.97201467,
      punctuated_word: 'music,',
    },
    {
      word: 'and',
      start: 17.800001,
      end: 18.12,
      confidence: 0.99851114,
      punctuated_word: 'and',
    },
    {
      word: 'lederhosen',
      start: 18.12,
      end: 18.62,
      confidence: 0.849826,
      punctuated_word: 'Lederhosen',
    },
    {
      word: 'as',
      start: 19.080002,
      end: 19.240002,
      confidence: 0.81338906,
      punctuated_word: 'as',
    },
    {
      word: 'far',
      start: 19.240002,
      end: 19.400002,
      confidence: 0.9995309,
      punctuated_word: 'far',
    },
    {
      word: 'as',
      start: 19.400002,
      end: 19.560001,
      confidence: 0.99795973,
      punctuated_word: 'as',
    },
    {
      word: 'the',
      start: 19.560001,
      end: 19.720001,
      confidence: 0.99738353,
      punctuated_word: 'the',
    },
    {
      word: 'eye',
      start: 19.720001,
      end: 19.960001,
      confidence: 0.9982356,
      punctuated_word: 'eye',
    },
    {
      word: 'can',
      start: 19.960001,
      end: 20.12,
      confidence: 0.99665534,
      punctuated_word: 'can',
    },
    {
      word: 'see',
      start: 20.12,
      end: 20.62,
      confidence: 0.99476826,
      punctuated_word: 'see.',
    },
    {
      word: 'starting',
      start: 20.920002,
      end: 21.240002,
      confidence: 0.998594,
      punctuated_word: 'Starting',
    },
    {
      word: 'in',
      start: 21.240002,
      end: 21.400002,
      confidence: 0.9951212,
      punctuated_word: 'in',
    },
    {
      word: 'late',
      start: 21.400002,
      end: 21.640001,
      confidence: 0.9984485,
      punctuated_word: 'late',
    },
    {
      word: 'september',
      start: 21.640001,
      end: 22.140001,
      confidence: 0.99702036,
      punctuated_word: 'September,',
    },
    {
      word: 'over',
      start: 22.52,
      end: 22.84,
      confidence: 0.9900007,
      punctuated_word: 'over',
    },
    {
      word: '6',
      start: 22.84,
      end: 23.055,
      confidence: 0.6389271,
      punctuated_word: '6',
    },
    {
      word: 'million',
      start: 23.295,
      end: 23.535,
      confidence: 0.54406315,
      punctuated_word: 'million',
    },
    {
      word: 'people',
      start: 23.535,
      end: 23.935,
      confidence: 0.9996222,
      punctuated_word: 'people',
    },
    {
      word: 'from',
      start: 23.935,
      end: 24.175001,
      confidence: 0.9993486,
      punctuated_word: 'from',
    },
    {
      word: 'around',
      start: 24.175001,
      end: 24.415,
      confidence: 0.99978036,
      punctuated_word: 'around',
    },
    {
      word: 'the',
      start: 24.415,
      end: 24.575,
      confidence: 0.99894863,
      punctuated_word: 'the',
    },
    {
      word: 'globe',
      start: 24.575,
      end: 25.055,
      confidence: 0.9992418,
      punctuated_word: 'globe',
    },
    {
      word: 'gather',
      start: 25.055,
      end: 25.375,
      confidence: 0.9074952,
      punctuated_word: 'gather',
    },
    {
      word: 'to',
      start: 25.375,
      end: 25.535,
      confidence: 0.9997744,
      punctuated_word: 'to',
    },
    {
      word: 'celebrate',
      start: 25.535,
      end: 26.015,
      confidence: 0.9998642,
      punctuated_word: 'celebrate',
    },
    {
      word: 'bavarian',
      start: 26.015,
      end: 26.515,
      confidence: 0.9886686,
      punctuated_word: 'Bavarian',
    },
    {
      word: 'culture',
      start: 26.575,
      end: 27.075,
      confidence: 0.9953433,
      punctuated_word: 'culture,',
    },
    {
      word: 'savor',
      start: 27.375,
      end: 27.855,
      confidence: 0.98999786,
      punctuated_word: 'savor',
    },
    {
      word: 'mouthwatering',
      start: 27.855,
      end: 28.355,
      confidence: 0.8768036,
      punctuated_word: 'mouthwatering',
    },
    {
      word: 'sausages',
      start: 28.575,
      end: 29.075,
      confidence: 0.99394596,
      punctuated_word: 'sausages,',
    },
    {
      word: 'and',
      start: 29.455,
      end: 29.775,
      confidence: 0.83777654,
      punctuated_word: 'and,',
    },
    {
      word: 'of',
      start: 29.775,
      end: 29.855,
      confidence: 0.99985945,
      punctuated_word: 'of',
    },
    {
      word: 'course',
      start: 29.855,
      end: 30.340313,
      confidence: 0.999547,
      punctuated_word: 'course,',
    },
    {
      word: 'indulge',
      start: 30.580313,
      end: 30.940311,
      confidence: 0.99718326,
      punctuated_word: 'indulge',
    },
    {
      word: 'in',
      start: 30.940311,
      end: 31.300312,
      confidence: 0.99884796,
      punctuated_word: 'in',
    },
    {
      word: 'over',
      start: 31.300312,
      end: 31.620314,
      confidence: 0.9988391,
      punctuated_word: 'over',
    },
    {
      word: '7,700,000',
      start: 31.620314,
      end: 32.120316,
      confidence: 0.94937944,
      punctuated_word: '7,700,000',
    },
    {
      word: 'liters',
      start: 33.060314,
      end: 33.46031,
      confidence: 0.9917587,
      punctuated_word: 'liters',
    },
    {
      word: 'of',
      start: 33.46031,
      end: 33.62031,
      confidence: 0.99943703,
      punctuated_word: 'of',
    },
    {
      word: 'beer',
      start: 33.62031,
      end: 34.12031,
      confidence: 0.99747306,
      punctuated_word: 'beer.',
    },
    {
      word: 'now',
      start: 34.42031,
      end: 34.660313,
      confidence: 0.99840266,
      punctuated_word: 'Now',
    },
    {
      word: "that's",
      start: 34.660313,
      end: 34.900314,
      confidence: 0.9490575,
      punctuated_word: "that's",
    },
    {
      word: 'a',
      start: 34.900314,
      end: 35.060314,
      confidence: 0.99784327,
      punctuated_word: 'a',
    },
    {
      word: 'party',
      start: 35.060314,
      end: 35.380314,
      confidence: 0.9999093,
      punctuated_word: 'party',
    },
    {
      word: 'not',
      start: 35.380314,
      end: 35.62031,
      confidence: 0.9994562,
      punctuated_word: 'not',
    },
    {
      word: 'to',
      start: 35.62031,
      end: 35.700314,
      confidence: 0.9987685,
      punctuated_word: 'to',
    },
    {
      word: 'be',
      start: 35.700314,
      end: 35.860313,
      confidence: 0.99990654,
      punctuated_word: 'be',
    },
    {
      word: 'missed',
      start: 35.860313,
      end: 36.360313,
      confidence: 0.9969932,
      punctuated_word: 'missed.',
    },
  ],
};
