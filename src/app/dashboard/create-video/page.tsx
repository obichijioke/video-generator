import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Link as LinkIcon, KeySquare, ImageIcon, MonitorPlay } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Video',
  description: 'Choose how you want to create your video',
};

const options = [
  {
    title: 'Text to video',
    description: 'Write or paste your own script to create a custom video',
    icon: FileText,
    href: '/dashboard/create-video/from-script',
  },
  {
    title: 'URL to video',
    description: 'Convert any article or blog post into an engaging video',
    icon: LinkIcon,
    href: '/dashboard/create-video/from-url',
  },
  {
    title: 'AI video editor',
    description: 'Create a video by providing keywords and letting AI do the work',
    icon: KeySquare,
    href: '/dashboard/create-video/from-keywords',
  },
  {
    title: 'Images to video',
    description: 'Turn your images into a professional video',
    icon: ImageIcon,
    href: '/dashboard/create-video/from-images',
  },
  {
    title: 'PPT to video',
    description: 'Convert your presentations into engaging videos',
    icon: MonitorPlay,
    href: '/dashboard/create-video/from-ppt',
    isNew: true,
  },
];

export default function CreateVideoPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Hello! Click one of the boxes below to create a new video</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {options.map((option) => (
          <Link key={option.title} href={option.href} className="block no-underline">
            <Card className="group h-[140px] transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                <option.icon className="mb-3 h-8 w-8 text-primary group-hover:text-primary/80" />
                <div>
                  <h3 className="font-medium">{option.title}</h3>
                  {option.isNew && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      New
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent projects</h2>
          <Link href="/dashboard/projects" className="text-sm text-primary hover:underline">
            Show all
          </Link>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="group overflow-hidden">
              <div className="aspect-video w-full bg-muted">{/* Placeholder for project thumbnail */}</div>
              <CardContent className="p-4">
                <h3 className="font-medium">Demo Project</h3>
                <p className="text-sm text-muted-foreground">Get started with {options[i - 1]?.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
