import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

interface SceneListProps {
  scenes: Scene[];
  selectedScene: Scene;
  onSceneSelect: (scene: Scene) => void;
  onSceneUpdate: (id: number, newContent: string) => void;
}

export function SceneList({ scenes, selectedScene, onSceneSelect, onSceneUpdate }: SceneListProps) {
  const [editingScene, setEditingScene] = useState<Scene | null>(null);

  const handleEditClick = (scene: Scene, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingScene(scene);
  };

  const handleDialogClose = () => {
    setEditingScene(null);
  };

  return (
    <div className="w-1/3 rounded-lg shadow p-4">
      <Input placeholder="Search..." className="mb-4" />
      <div className="space-y-4">
        {scenes.map((scene) => (
          <div key={scene.id}>
            <div
              className={`p-4 rounded border cursor-pointer ${selectedScene.id === scene.id ? 'bg-blue-50/[.06]' : 'hover:bg-gray-50/[.06]'}`}
              onClick={() => onSceneSelect(scene)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={scene.thumbnail}
                    alt={`Thumbnail for ${scene.title}`}
                    width={80}
                    height={45}
                    className="rounded object-cover object-center h-[80px] w-[80px]"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{scene.title}</h3>
                    <Button variant="ghost" size="sm" onClick={(e) => handleEditClick(scene, e)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{scene.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={editingScene !== null} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingScene?.title}</DialogTitle>
          </DialogHeader>
          {editingScene && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={editingScene.thumbnail}
                  alt={`Thumbnail for ${editingScene.title}`}
                  width={160}
                  height={90}
                  className="rounded"
                />
                <div>
                  <h3 className="font-semibold">{editingScene.title}</h3>
                  <p className="text-sm text-gray-600">Edit scene content below</p>
                </div>
              </div>
              <Textarea
                value={editingScene.content}
                onChange={(e) => onSceneUpdate(editingScene.id, e.target.value)}
                rows={5}
              />
              <Button
                onClick={() => {
                  onSceneUpdate(editingScene.id, editingScene.content);
                  handleDialogClose();
                }}
              >
                Save
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
