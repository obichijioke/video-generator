import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { DashboardGradient } from '@/components/gradients/dashboard-gradient';
import '../../../styles/dashboard.css';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';
import DashboardHeader from '@/components/dashboard/layout/dashboard-header';
interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <DashboardHeader />
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
