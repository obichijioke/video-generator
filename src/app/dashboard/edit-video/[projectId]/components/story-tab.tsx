'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Scene {
  id: string;
  scene_number: number;
  content: string;
}

interface StoryTabProps {
  scenes: Scene[];
  currentSceneIndex: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSceneSelect: (index: number) => void;
}

export function StoryTab({ scenes, currentSceneIndex, searchQuery, onSearchChange, onSceneSelect }: StoryTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Scenes</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-[200px] pl-8"
            placeholder="Search scenes..."
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-auto">
        {scenes.map((scene, index) => (
          <Card
            key={scene.id}
            className={cn('p-4 hover:bg-accent/50 cursor-pointer', currentSceneIndex === index && 'border-primary')}
            onClick={() => onSceneSelect(index)}
          >
            <div className="mb-2 text-sm text-muted-foreground">Scene {scene.scene_number}</div>
            <p>{scene.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
