'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { Header, Sidebar, PreviewSection, StoryTab, VisualsTab } from './components';

interface Scene {
  id: string;
  scene_number: number;
  content: string;
  media_url: string | null;
}

interface VideoProject {
  id: string;
  title: string;
  scenes: Scene[];
}

const mediaCategories = ['Data', 'Tools', 'Information', 'Linked', 'Personal'];

const dummyMedia = [
  { id: 1, type: 'video', duration: '00:19', thumbnail: '/path/to/thumbnail1.jpg', category: 'Data' },
  { id: 2, type: 'video', duration: '00:14', thumbnail: '/path/to/thumbnail2.jpg', category: 'Tools' },
  { id: 3, type: 'video', duration: '00:16', thumbnail: '/path/to/thumbnail3.jpg', category: 'Information' },
  { id: 4, type: 'video', duration: '00:15', thumbnail: '/path/to/thumbnail4.jpg', category: 'Linked' },
];

interface MediaItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video';
  creator?: string;
  license: string;
}

export default function EditVideoPage({ params }: { params: { projectId: string } }) {
  const [activeTab, setActiveTab] = useState('story');
  const [project, setProject] = useState<VideoProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Data');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [deletingSceneId, setDeletingSceneId] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const supabase = createClient();
  const { user } = useUserInfo(supabase);
  const router = useRouter();
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProject();
    }
  }, [user]);

  const fetchProject = async () => {
    if (!user) {
      toast.error('Please sign in to view this project');
      router.push('/dashboard');
      return;
    }

    try {
      const { data: projectData, error: projectError } = await supabase
        .from('video_projects')
        .select('*')
        .eq('id', params.projectId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (projectError) throw projectError;

      if (!projectData) {
        toast.error('Project not found or you do not have access to it');
        router.push('/dashboard');
        return;
      }

      const { data: scenesData, error: scenesError } = await supabase
        .from('video_scenes')
        .select('*')
        .eq('project_id', params.projectId)
        .order('scene_number');

      if (scenesError) throw scenesError;

      setProject({
        ...projectData,
        scenes: scenesData || [],
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project. Please try again.');
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousScene = () => {
    setCurrentSceneIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextScene = () => {
    if (!project?.scenes) return;
    setCurrentSceneIndex((prev) => Math.min(project.scenes.length - 1, prev + 1));
  };

  const handleEditScene = (scene: Scene) => {
    setEditingScene({ ...scene });
  };

  const handleSaveEdit = async () => {
    if (!editingScene || !project) return;

    try {
      const { error } = await supabase
        .from('video_scenes')
        .update({
          content: editingScene.content,
          media_url: editingScene.media_url,
        })
        .eq('id', editingScene.id);

      if (error) throw error;

      const updatedScenes = project.scenes.map((scene) => (scene.id === editingScene.id ? editingScene : scene));

      setProject({ ...project, scenes: updatedScenes });
      setEditingScene(null);
      toast.success('Scene updated successfully');
    } catch (error) {
      console.error('Error updating scene:', error);
      toast.error('Failed to update scene');
    }
  };

  const handleDeleteScene = async () => {
    if (!deletingSceneId || !project) return;

    try {
      const { error } = await supabase.from('video_scenes').delete().eq('id', deletingSceneId);

      if (error) throw error;

      const updatedScenes = project.scenes
        .filter((scene) => scene.id !== deletingSceneId)
        .map((scene, index) => ({
          ...scene,
          scene_number: index + 1,
        }));

      setProject({ ...project, scenes: updatedScenes });
      if (currentSceneIndex >= updatedScenes.length) {
        setCurrentSceneIndex(Math.max(0, updatedScenes.length - 1));
      }
      toast.success('Scene deleted successfully');
    } catch (error) {
      console.error('Error deleting scene:', error);
      toast.error('Failed to delete scene');
    } finally {
      setDeletingSceneId(null);
    }
  };

  const handleScenesReorder = async (newScenes: Scene[]) => {
    if (!project) return;

    try {
      const updates = newScenes.map((scene) => ({
        id: scene.id,
        scene_number: scene.scene_number,
      }));

      const { error } = await supabase.from('video_scenes').upsert(updates);

      if (error) throw error;

      setProject({ ...project, scenes: newScenes });
      toast.success('Scenes reordered successfully');
    } catch (error) {
      console.error('Error reordering scenes:', error);
      toast.error('Failed to reorder scenes');
    }
  };

  const handleMediaSelect = async (url: string) => {
    if (selectedSceneId && project) {
      try {
        const { error } = await supabase.from('video_scenes').update({ media_url: url }).eq('id', selectedSceneId);

        if (error) throw error;

        const updatedScenes = project.scenes.map((scene) =>
          scene.id === selectedSceneId ? { ...scene, media_url: url } : scene,
        );
        setProject({ ...project, scenes: updatedScenes });
        toast.success('Media updated successfully');
      } catch (error) {
        console.error('Error updating scene media:', error);
        toast.error('Failed to update scene media');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <StoryTab
            scenes={project?.scenes || []}
            currentSceneIndex={currentSceneIndex}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSceneSelect={setCurrentSceneIndex}
            onScenesReorder={handleScenesReorder}
            onEditScene={handleEditScene}
            onDeleteScene={setDeletingSceneId}
            selectedSceneId={selectedSceneId}
            setSelectedSceneId={setSelectedSceneId}
          />
        );

      case 'visuals':
        return (
          <VisualsTab
            onMediaSelect={handleMediaSelect}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            mediaType={mediaType}
            setMediaType={setMediaType}
            results={results}
            setResults={setResults}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            page={page}
            setPage={setPage}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            This tab is not implemented yet
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-1 flex-col">
          <Header title={project.title} />

          <div className="grid flex-1 grid-cols-2 gap-4 p-4">
            <div className="overflow-auto">{renderContent()}</div>

            <PreviewSection
              currentSceneIndex={currentSceneIndex}
              totalScenes={project.scenes.length}
              onPrevious={handlePreviousScene}
              onNext={handleNextScene}
            />
          </div>
        </div>
      </div>

      {/* Edit Scene Dialog */}
      <Dialog open={!!editingScene} onOpenChange={(open) => !open && setEditingScene(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Scene {editingScene?.scene_number}</DialogTitle>
            <DialogDescription>Make changes to the scene content below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={editingScene?.content || ''}
                onChange={(e) => setEditingScene(editingScene ? { ...editingScene, content: e.target.value } : null)}
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="media_url" className="text-sm font-medium">
                Media URL
              </label>
              <input
                id="media_url"
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={editingScene?.media_url || ''}
                onChange={(e) => setEditingScene(editingScene ? { ...editingScene, media_url: e.target.value } : null)}
                placeholder="Enter image or video URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingScene(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Scene Dialog */}
      <AlertDialog open={!!deletingSceneId} onOpenChange={(open) => !open && setDeletingSceneId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Scene</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this scene? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteScene}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
