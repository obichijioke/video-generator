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

interface VideoPreviewProps {
  selectedScene: {
    content: string;
    thumbnail: string;
  };
  videoSize: VideoSize;
  onVideoSizeChange: (size: VideoSize) => void;
}

export function VideoPreview({ selectedScene, videoSize, onVideoSizeChange }: VideoPreviewProps) {
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
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Scene duration: 9s</span>
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
        <div className="w-[100%] h-[100%] mb-10">
          <div
            className={`${getVideoSizeClass()} border rounded-lg flex items-center justify-center bg-cover bg-center`}
            style={{ backgroundImage: `url(${selectedScene.thumbnail})` }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">INTRODUCTION:</h2>
              <p className="text-xl">{selectedScene.content}</p>
            </div>
          </div>
          <div className="py-4 flex justify-between items-center mb-10">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Rewind className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
