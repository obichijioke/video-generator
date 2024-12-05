'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Image, Video } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video';
  creator?: string;
  license: string;
}

interface VisualsTabProps {
  onMediaSelect: (url: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mediaType: 'image' | 'video';
  setMediaType: (type: 'image' | 'video') => void;
  results: MediaItem[];
  setResults: (results: MediaItem[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  page: number;
  setPage: (page: number) => void;
}

export function VisualsTab({
  onMediaSelect,
  searchQuery,
  setSearchQuery,
  mediaType,
  setMediaType,
  results,
  setResults,
  isLoading,
  setIsLoading,
  page,
  setPage,
}: VisualsTabProps) {
  const searchMedia = async (reset = false) => {
    const newPage = reset ? 1 : page;
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/openverse?q=${encodeURIComponent(searchQuery)}&page=${newPage}&type=${mediaType}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedResults = data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: mediaType === 'image' ? item.url : item.url,
        thumbnail: mediaType === 'image' ? item.thumbnail : item.thumbnail,
        type: mediaType,
        creator: item.creator,
        license: item.license,
      }));

      setResults(reset ? formattedResults : [...results, ...formattedResults]);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant={mediaType === 'image' ? 'default' : 'outline'} onClick={() => setMediaType('image')}>
            <Image className="mr-2 h-4 w-4" />
            Images
          </Button>
          <Button variant={mediaType === 'video' ? 'default' : 'outline'} onClick={() => setMediaType('video')}>
            <Video className="mr-2 h-4 w-4" />
            Videos
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder={`Search ${mediaType}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMedia(true)}
          />
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="grid grid-cols-2 gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => onMediaSelect(item.url)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                {item.creator && <p className="text-xs text-gray-300">By {item.creator}</p>}
              </div>
            </div>
          ))}
        </div>

        {results.length > 0 && (
          <Button variant="outline" className="mt-4" onClick={() => searchMedia()} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="h-4 w-4" /> : 'Load more'}
          </Button>
        )}
      </ScrollArea>
    </div>
  );
}
