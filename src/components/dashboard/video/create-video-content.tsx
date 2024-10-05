'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import VideoFromUrl from './videoFromUrl';

const CreateVideoContent = () => {
  const [articleUrl, setArticleUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (dialogType: string) => {
    // Handle the submit action based on the dialog type
    console.log('Submitted:', dialogType, articleUrl);
    setArticleUrl('');
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Create Video</h1>
        <p className="text-sm text-gray-500">Create a new video with AeroEdit</p>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Welcome to AI Chat</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From scratch card */}
            <Card>
              <CardHeader>
                <CardTitle>From scratch</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Start</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start from scratch</DialogTitle>
                      <DialogDescription>Are you sure you want to start a new chat from scratch?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmit('scratch')}>Start</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* From article URL card */}
            <Card>
              <CardHeader>
                <CardTitle>From article URL</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Start</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>Start from article URL</DialogTitle>
                      <DialogDescription>Enter the URL of the article you want to chat about:</DialogDescription>
                    </DialogHeader>
                    <VideoFromUrl />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* From file upload card */}
            <Card>
              <CardHeader>
                <CardTitle>From file upload</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Start</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start from file upload</DialogTitle>
                      <DialogDescription>File upload functionality to be implemented.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmit('upload')}>Start</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoContent;
