'use client';

import { cn } from '@/lib/utils';
import { BookOpenText, Laptop, Image, Music, Type, Palette, Grid, Settings } from 'lucide-react';

export const sidebarTabs = [
  { icon: BookOpenText, label: 'Story', id: 'story' },
  { icon: Laptop, label: 'Visuals', id: 'visuals' },
  { icon: Image, label: 'Media', id: 'media' },
  { icon: Music, label: 'Audio', id: 'audio' },
  { icon: Type, label: 'Text', id: 'text' },
  { icon: Palette, label: 'Styles', id: 'styles' },
  { icon: Grid, label: 'Elements', id: 'elements' },
  { icon: Settings, label: 'Format', id: 'format' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="flex w-20 flex-col items-center border-r bg-background">
      {sidebarTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex w-full flex-col items-center gap-1 p-3 text-xs hover:bg-accent',
            activeTab === tab.id && 'bg-accent',
          )}
        >
          <tab.icon className="h-5 w-5" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
