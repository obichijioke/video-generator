'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface MediaItem {
  id: number;
  type: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface VisualsTabProps {
  mediaCategories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  mediaItems: MediaItem[];
}

export function VisualsTab({
  mediaCategories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  mediaItems,
}: VisualsTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {mediaCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-[300px] pl-8"
              placeholder="Search images and videos"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mediaItems.map((media) => (
            <div
              key={media.id}
              className="group relative aspect-video rounded-lg bg-muted overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary"
            >
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {media.duration}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
