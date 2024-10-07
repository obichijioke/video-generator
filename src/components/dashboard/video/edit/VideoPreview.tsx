import { ChevronDown, HelpCircle, Maximize2, Pause, Repeat, Rewind, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPreviewProps {
  selectedScene: {
    content: string;
    thumbnail: string;
  };
}

export function VideoPreview({ selectedScene }: VideoPreviewProps) {
  return (
    <div className="flex-1 rounded-lg shadow flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Scene duration: 9s</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Landscape</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="flex-[1_1_0%] p-4">
        <div
          className="aspect-video border rounded-lg flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedScene.thumbnail})` }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">INTRODUCTION:</h2>
            <p className="text-xl">{selectedScene.content}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
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
  );
}
