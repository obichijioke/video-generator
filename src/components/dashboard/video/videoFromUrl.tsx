'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const VideoFromUrl = () => {
  const [scenes, setScenes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articleUrl, setArticleUrl] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Fetch scenes from the URL
    // Assuming the URL is valid and returns a JSON response
    // Replace the following with actual API call
    const response = await fetch('https://api.example.com/scenes');
    const data = await response.json();
    setScenes(data);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-4 w-full lg:w-[600px]">
      <div className="flex gap-2 items-center w-full">
        <Input
          id="articleUrl"
          placeholder="Enter article URL"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default VideoFromUrl;
