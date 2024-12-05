'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Link as LinkIcon,
  Settings2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
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
import { CSS } from '@dnd-kit/utilities';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Scene {
  id: number;
  content: string;
}

interface ArticleData {
  title: string;
  content: string;
  scenes: Scene[];
}

interface VideoProject {
  id: string;
  title: string;
  source_url: string;
  source_content: string;
  created_at: string;
  user_id: string;
  status: 'draft' | 'processing' | 'completed';
}

interface VideoScene {
  id: string;
  project_id: string;
  scene_number: number;
  content: string;
  created_at: string;
}

interface SortableSceneProps {
  scene: Scene;
  onEdit: (scene: Scene) => void;
  onDelete: (id: number) => void;
}

function SortableScene({ scene, onEdit, onDelete }: SortableSceneProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: scene.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Card ref={setNodeRef} style={style} className={`p-4 ${isDragging ? 'opacity-50 border-primary' : ''}`}>
      <div className="flex items-start gap-2">
        <button className="mt-1 cursor-grab touch-none" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Scene {scene.id}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(scene)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit scene</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-destructive"
                onClick={() => onDelete(scene.id)}
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

export default function ArticleToVideoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [deletingSceneId, setDeletingSceneId] = useState<number | null>(null);
  const [isAddingScene, setIsAddingScene] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

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

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const fetchArticleData = async (url: string): Promise<ArticleData> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      title: 'Article Title',
      content: 'This is the article content...',
      scenes: [
        {
          id: 1,
          content:
            'Have you ever wondered how much of your personal information is being shared without your knowledge?',
        },
        { id: 2, content: 'You have the power to control your data and protect your privacy.' },
        { id: 3, content: 'By opting out, you prevent your information from being sold or shared with affiliates.' },
        { id: 4, content: "Cookies and tracking tools are everywhere, but they don't have to control your life." },
      ],
    };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && articleData) {
      const oldIndex = articleData.scenes.findIndex((scene) => scene.id === active.id);
      const newIndex = articleData.scenes.findIndex((scene) => scene.id === over.id);

      const reorderedScenes = arrayMove(articleData.scenes, oldIndex, newIndex);

      const updatedScenes = reorderedScenes.map((scene, index) => ({
        ...scene,
        id: index + 1,
      }));

      setArticleData({
        ...articleData,
        scenes: updatedScenes,
      });
    }
  };

  const handleEditScene = (scene: Scene) => {
    setEditingScene(scene);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScene || !articleData) return;

    const updatedScenes = articleData.scenes.map((scene) => (scene.id === editingScene.id ? editingScene : scene));

    setArticleData({
      ...articleData,
      scenes: updatedScenes,
    });
    setEditingScene(null);
  };

  const handleDeleteScene = (id: number) => {
    if (!articleData) return;
    setDeletingSceneId(null);

    const filteredScenes = articleData.scenes
      .filter((scene) => scene.id !== id)
      .map((scene, index) => ({
        ...scene,
        id: index + 1,
      }));

    setArticleData({
      ...articleData,
      scenes: filteredScenes,
    });
  };

  const handleAddScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleData || !editingScene) return;

    const newScene = {
      id: articleData.scenes.length + 1,
      content: editingScene.content,
    };

    setArticleData({
      ...articleData,
      scenes: [...articleData.scenes, newScene],
    });
    setIsAddingScene(false);
    setEditingScene(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsOpen(false);
    setIsLoading(true);

    try {
      const data = await fetchArticleData(url);
      setArticleData(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push('/dashboard/create-video');
  };

  const createVideoProject = async () => {
    if (!articleData) return;
    if (!user) {
      toast.error('Please sign in to create a project');
      return;
    }

    setIsCreatingProject(true);

    try {
      // Create the project using the user from useUserInfo
      const { data: project, error: projectError } = await supabase
        .from('video_projects')
        .insert({
          title: articleData.title,
          source_url: url,
          source_content: articleData.content,
          status: 'draft',
          user_id: user.id,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Create the scenes
      const scenesData = articleData.scenes.map((scene) => ({
        project_id: project.id,
        scene_number: scene.id,
        content: scene.content,
      }));

      const { error: scenesError } = await supabase.from('video_scenes').insert(scenesData);

      if (scenesError) throw scenesError;

      // Redirect to edit page
      router.push(`/dashboard/edit-video/${project.id}`);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <div className="h-full">
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Enter Article URL
            </DialogTitle>
            <DialogDescription>
              Paste the URL of any article or blog post you want to convert into a video.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 space-y-4">
              <Input
                id="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                required
                className="w-full"
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Create Video'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit/Add Scene Dialog */}
      <Dialog
        open={!!editingScene}
        onOpenChange={(open) => {
          if (!open) {
            setEditingScene(null);
            setIsAddingScene(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAddingScene ? 'Add New Scene' : `Edit Scene ${editingScene?.id}`}</DialogTitle>
          </DialogHeader>
          <form onSubmit={isAddingScene ? handleAddScene : handleSaveEdit}>
            <div className="mt-4 space-y-4">
              <Textarea
                value={editingScene?.content || ''}
                onChange={(e) => setEditingScene(editingScene ? { ...editingScene, content: e.target.value } : null)}
                className="min-h-[100px]"
                placeholder="Enter scene content..."
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setEditingScene(null);
                    setIsAddingScene(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">{isAddingScene ? 'Add Scene' : 'Save Changes'}</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingSceneId} onOpenChange={(open: boolean) => !open && setDeletingSceneId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the scene.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deletingSceneId && handleDeleteScene(deletingSceneId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Creating Project Dialog */}
      <Dialog open={isCreatingProject} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Creating Your Video Project</DialogTitle>
            <DialogDescription>Please wait while we set up your project...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Main content */}
      {!isOpen && (
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b">
            <div className="flex h-16 items-center justify-between px-4">
              <h1 className="text-lg font-semibold">{articleData?.title || 'Creating Video from URL'}</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Scene settings
                </Button>
                <div className="flex">
                  <Button variant="outline" size="sm" className="rounded-r-none border-r-0">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-l-none"
                    onClick={createVideoProject}
                    disabled={isCreatingProject || !articleData}
                  >
                    {isCreatingProject ? (
                      <>
                        <LoadingSpinner className="mr-2 h-4 w-4" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid h-[calc(100vh-4rem)] grid-cols-2 gap-4 p-4">
            {/* Source Article */}
            <div className="overflow-auto rounded-lg border bg-card p-4">
              <h2 className="mb-4 text-lg font-semibold">Source article</h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">Loading article...</div>
              ) : (
                <div className="prose max-w-none dark:prose-invert">{articleData?.content}</div>
              )}
            </div>

            {/* AI Scenes */}
            <div className="overflow-auto">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">AI powered summary</h2>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsAddingScene(true);
                    setEditingScene({ id: 0, content: '' });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Scene
                </Button>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">Generating scenes...</div>
                ) : articleData?.scenes ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={articleData.scenes} strategy={verticalListSortingStrategy}>
                      {articleData.scenes.map((scene) => (
                        <SortableScene
                          key={scene.id}
                          scene={scene}
                          onEdit={handleEditScene}
                          onDelete={(id) => setDeletingSceneId(id)}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
