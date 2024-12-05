-- Create enum for project status
CREATE TYPE project_status AS ENUM ('draft', 'processing', 'completed');

-- Create video projects table
CREATE TABLE video_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    source_url TEXT,
    source_content TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status project_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create video scenes table
CREATE TABLE video_scenes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES video_projects(id) ON DELETE CASCADE,
    scene_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_video_projects_updated_at
    BEFORE UPDATE ON video_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_scenes_updated_at
    BEFORE UPDATE ON video_scenes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE video_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_scenes ENABLE ROW LEVEL SECURITY;

-- Create policies for video_projects
CREATE POLICY "Users can view their own projects"
    ON video_projects
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
    ON video_projects
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
    ON video_projects
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
    ON video_projects
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for video_scenes
CREATE POLICY "Users can view scenes of their own projects"
    ON video_scenes
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM video_projects
            WHERE video_projects.id = video_scenes.project_id
            AND video_projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create scenes for their own projects"
    ON video_scenes
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM video_projects
            WHERE video_projects.id = video_scenes.project_id
            AND video_projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update scenes of their own projects"
    ON video_scenes
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM video_projects
            WHERE video_projects.id = video_scenes.project_id
            AND video_projects.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM video_projects
            WHERE video_projects.id = video_scenes.project_id
            AND video_projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete scenes of their own projects"
    ON video_scenes
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM video_projects
            WHERE video_projects.id = video_scenes.project_id
            AND video_projects.user_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX video_projects_user_id_idx ON video_projects(user_id);
CREATE INDEX video_scenes_project_id_idx ON video_scenes(project_id);
CREATE INDEX video_scenes_scene_number_idx ON video_scenes(project_id, scene_number); 