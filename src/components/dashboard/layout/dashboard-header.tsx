import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Bell } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
const DashboardHeader = () => {
  return (
    <header className="shadow-sm p-4 flex justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">AeroEdit</h1>
        <Button variant="outline" size="sm">
          14 day trial activated!
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button size="sm">Upgrade</Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          Create a team
        </Button>
        <Button variant="ghost" size="sm">
          My projects
        </Button>
        <Button variant="ghost" size="sm">
          Get started
        </Button>
        <Button variant="ghost" size="sm">
          Help
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar.Root className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
          D
        </Avatar.Root>
      </div>
    </header>
  );
};

export default DashboardHeader;
