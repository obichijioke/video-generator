'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Header, Sidebar, PreviewSection, StoryTab, VisualsTab } from './components';

interface Scene {
  id: string;
  scene_number: number;
  content: string;
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

export default function EditVideoPage({ params }: { params: { projectId: string } }) {
  const [activeTab, setActiveTab] = useState('story');
  const [project, setProject] = useState<VideoProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Data');
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();
  const { user } = useUserInfo(supabase);
  const router = useRouter();

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
          />
        );

      case 'visuals':
        return (
          <VisualsTab
            mediaCategories={mediaCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            mediaItems={dummyMedia}
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
  );
}
