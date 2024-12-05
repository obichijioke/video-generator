'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface PreviewSectionProps {
  currentSceneIndex: number;
  totalScenes: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PreviewSection({ currentSceneIndex, totalScenes, onPrevious, onNext }: PreviewSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full rounded-lg bg-black">{/* Video preview will go here */}</div>
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
