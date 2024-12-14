-- Add scenes JSONB column to video_projects
ALTER TABLE video_projects
ADD COLUMN scenes JSONB[];

-- Migrate existing scenes data to the new column
UPDATE video_projects
SET scenes = (
    WITH ordered_scenes AS (
        SELECT 
            id,
            scene_number,
            content,
            created_at,
            updated_at
        FROM video_scenes vs
        WHERE vs.project_id = video_projects.id
        ORDER BY scene_number
    )
    SELECT array_agg(
        jsonb_build_object(
            'id', id,
            'scene_number', scene_number,
            'content', content,
            'created_at', created_at,
            'updated_at', updated_at
        )
    )
    FROM ordered_scenes
);

-- Drop video_scenes table and its related objects
DROP TRIGGER IF EXISTS update_video_scenes_updated_at ON video_scenes;
DROP TABLE video_scenes; 