'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface Scene {
  id: string;
  scene_number: number;
  content: string;
  media_url: string | null;
}

interface StoryTabProps {
  scenes: Scene[];
  currentSceneIndex: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSceneSelect: (index: number) => void;
  onScenesReorder: (scenes: Scene[]) => void;
  onEditScene: (scene: Scene) => void;
  onDeleteScene: (sceneId: string) => void;
}

interface SortableSceneProps {
  scene: Scene;
  isActive: boolean;
  onEdit: (scene: Scene) => void;
  onDelete: (sceneId: string) => void;
  onClick: () => void;
}

function SortableScene({ scene, isActive, onEdit, onDelete, onClick }: SortableSceneProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: scene.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn('p-4 hover:bg-accent/50 cursor-pointer', isActive && 'border-primary', isDragging && 'opacity-50')}
    >
      <div className="flex items-start gap-2">
        <button className="mt-1 cursor-grab touch-none" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex-1" onClick={onClick}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Scene {scene.scene_number}</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(scene);
                }}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit scene</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(scene.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete scene</span>
              </Button>
            </div>
          </div>
          <p>{scene.content}</p>
        </div>
      </div>
    </Card>
  );
}

export function StoryTab({
  scenes,
  currentSceneIndex,
  searchQuery,
  onSearchChange,
  onSceneSelect,
  onScenesReorder,
  onEditScene,
  onDeleteScene,
}: StoryTabProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = scenes.findIndex((scene) => scene.id === active.id);
      const newIndex = scenes.findIndex((scene) => scene.id === over.id);

      const newScenes = arrayMove(scenes, oldIndex, newIndex).map((scene, index) => ({
        ...scene,
        scene_number: index + 1,
      }));

      onScenesReorder(newScenes);
    }
  };

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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={scenes} strategy={verticalListSortingStrategy}>
            {scenes.map((scene, index) => (
              <SortableScene
                key={scene.id}
                scene={scene}
                isActive={currentSceneIndex === index}
                onEdit={onEditScene}
                onDelete={onDeleteScene}
                onClick={() => onSceneSelect(index)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
