'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import "@/styles/globals.scss"
import SettingsLayout from '@/layouts/SettingsLayout'
import BillingPage from './billing'
import ProfilePage from './profile'
import SystemSettingsPage from './system'
import PeteSettings from './pete'

type SettingsPageProps = {
  activePage?: string;
  setActivePage?: (page: string) => void;
}

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/settings/profile')
  }, [router])

  return null
}