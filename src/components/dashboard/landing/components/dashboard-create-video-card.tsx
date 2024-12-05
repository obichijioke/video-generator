import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Video } from 'lucide-react';

export function DashboardCreateVideoCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Create Video</CardTitle>
        <Video className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <Link href="/dashboard/create-video">
            <Button className="w-full" variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Create New Video
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
