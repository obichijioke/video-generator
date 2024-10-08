import { LayoutGrid, Image, Music, Type, Shapes, Palette, Briefcase, LayoutTemplate } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-24 flex flex-col items-center py-4 space-y-3 border-r px-2">
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Story"
      >
        <LayoutGrid className="h-6 w-6" />
        <span className="text-xs mt-1">Story</span>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer">
        <Image className="h-6 w-6" />
        <span className="text-xs mt-1">Visuals</span>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer">
        <Music className="h-6 w-6" />
        <span className="text-xs mt-1">Audio</span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Text"
      >
        <Type className="h-6 w-6" />
        <span className="text-xs mt-1">Text</span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Elements"
      >
        <Shapes className="h-6 w-6" />
        <span className="text-xs mt-1">Elements</span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Styles"
      >
        <Palette className="h-6 w-6" />
        <span className="text-xs mt-1">Styles</span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Branding"
      >
        <Briefcase className="h-6 w-6" />
        <span className="text-xs mt-1">Branding</span>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center py-3 rounded-md hover:bg-gray-100/[.06] cursor-pointer"
        aria-label="Format"
      >
        <LayoutTemplate className="h-6 w-6" />
        <span className="text-xs mt-1">Format</span>
      </div>
    </div>
  );
}
