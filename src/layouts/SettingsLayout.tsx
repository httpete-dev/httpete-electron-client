'use client'

import Navbar from "@/components/layout/navbar";
import SettingsSidebar from "@/components/settings-sidebar";
import { useEffect, useState, ReactNode } from "react";
import { usePathname } from 'next/navigation';
import { TooltipProvider } from "@/components/ui/tooltip";

type SettingsLayoutProps = {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [width, setWidth] = useState(1280)
  const pathname = usePathname()
  const activePage = pathname?.split('/').pop() || 'profile'

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar title="Settings" isMobile={width < 768} />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <TooltipProvider>

        <SettingsSidebar width={width} activePage={activePage} />
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
        </TooltipProvider>
      </div>
    </div>
  )
}