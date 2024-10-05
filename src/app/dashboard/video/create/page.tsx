import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import CreateVideoContent from '@/components/dashboard/video/create-video-content';
import React, { Suspense } from 'react';

const CreateVideoPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Create Video'} />
      <Suspense fallback={<LoadingScreen />}>
        <CreateVideoContent />
      </Suspense>
    </main>
  );
};

export default CreateVideoPage;
