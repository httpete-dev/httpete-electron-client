'use client'

import { useState } from 'react'
import { Bell, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react'
import "@/styles/globals.css"
import SettingsLayout from '@/layouts/SettingsLayout'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import BillingPage from './billing'
import ProfilePage from './profile'
import SystemSettingsPage from './system'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    twoFactorAuth: false,
  })
  const [activePage, setActivePage] = useState('Profile');

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordFields(prev => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated settings and password to your backend
    console.log('Updated settings:', settings)
    console.log('Password change request:', passwordFields)
  }

  console.log('activePage', activePage)
  return (
    <SettingsLayout>

    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <div className='flex flex-col w-full'>
          <h1 className='mt-8 ml-8 mb-0 text-5xl'>{activePage}</h1>
          {activePage === 'Profile' && <ProfilePage />}
          {activePage === 'System Settings' && <SystemSettingsPage />}
          {activePage === 'Billing' && <BillingPage />}
          {activePage === 'Pete' && <PeteSettings />}
        </div>
      </div>
    </main>
    </SettingsLayout>
  )
}

const PeteSettings = () => {
  const [gptApiKey, setGptApiKey] = useState('')
  const [gptUseInternet, setGptUseInternet] = useState(false)

  return (
    <div className='bg-gray-800 w-fit p-8 rounded-lg m-8'>
      <h2 className="text-2xl font-semibold mb-4">Open AI</h2>
      <div className="flex flex-col items-center justify-between">
        <div className="space-y-2">
          <Label htmlFor="gptKey">OpenAI API Key</Label>
          <div className="flex flex-row gap-2">
            <Input
              id='gptKey'
              type='text'
              value={gptApiKey}
              onChange={(e) => setGptApiKey(e.target.value)}
              className="bg-gray-700 pr-10"
              style={{ minWidth: '650px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mt-6">

        <div className='flex flex-col p-2'>
        <Label htmlFor="gptModel" className='ml-8'>Default Model</Label>
              <select
                id='gptModel'
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 m-4"
                >
                <option>GPT 4o</option>
                <option>GPT 3.5</option>
                <option>GPT 3</option>
                <option>GPT O1</option>
                <option>GPT O1 Mini</option>
              </select>
              </div>
              <div className='flex flex-col p-2'>

              <Label htmlFor="useInternet" className='ml-8'>Web Access</Label>
              <select
                id='gptModel'
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 m-4"
                >
                <option>Always Off</option>
                <option>Off</option>
                <option>Always ask</option>
                <option>On</option>
                <option>Always On</option>
              </select>
                </div>
            <Button className='w-56 mt-8 relative ml-auto'>Save</Button>
                  </div>
            </div>
    </div>
  )
}