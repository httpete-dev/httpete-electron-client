'use client'

import SettingsLayout from '@/layouts/SettingsLayout'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SettingsLayout>{children}</SettingsLayout>
    </TooltipProvider>
  )
} 