'use client'

import { useState } from 'react'
import { Bell, Lock, Eye, EyeOff, Moon, Sun, ScreenShare, LockIcon } from 'lucide-react'
import { Tooltip } from '@radix-ui/react-tooltip'
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    twoFactorAuth: false,
    streamerMode: false,
  })

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
    console.log('Updated settings:', settings)
    console.log('Password change request:', passwordFields)
  }


  return (
    <form onSubmit={handleSubmit} className="w-full p-8 space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <Label htmlFor="emailNotifications">Email Notifications</Label>
            </div>
            <Tooltip>


              <TooltipTrigger asChild>

                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  disabled={true}
                  onCheckedChange={() => handleSettingChange('emailNotifications')}
                  className={settings.emailNotifications === false ? 'bg-slate-500' : 'bg-red-500'}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                style={{ maxWidth: '350px' }}
              >
                <h1 className='font-normal text-lg'>Right now, email is the only way we have to get in touch with you, so you cannot disable this. In the future, we will implement
                  other Notification systems, which will allow you to choose to turn this off.
                </h1>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <Label htmlFor="pushNotifications">Push Notifications</Label>
            </div>
            <Switch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleSettingChange('pushNotifications')}
            />
          </div> */}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <Label htmlFor="darkMode">Dark Mode</Label>
          </div>
          <Tooltip>


            <TooltipTrigger asChild>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                disabled={true}
                onCheckedChange={() => handleSettingChange('darkMode')}
                className={settings.darkMode === false ? ' bg-slate-500' : ' bg-red-500'}
              />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="center"
              style={{ maxWidth: '350px' }}
            >
              <h1 className='font-normal text-lg'>Light theme coming soon!</h1>
            </TooltipContent>
          </Tooltip>

        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
          
          <div className="flex items-center space-x-2 w-full">
            {settings.streamerMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <Label htmlFor="streamerMode">Streamer Mode</Label>


              <Switch
                id="streamerMode"
                checked={settings.streamerMode}
                disabled={true}
                onCheckedChange={() => handleSettingChange('streamerMode')}
                className={' ' + (settings.streamerMode === false ? ' bg-slate-500' : ' bg-red-500')} 
                />
            </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="center"
              style={{ maxWidth: '350px' }}
              >
              <h1 className='font-normal text-lg'>Light theme coming soon!</h1>
            </TooltipContent>
          </Tooltip>
              </div>

      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
            </div>
            <Tooltip>


              <TooltipTrigger asChild>
                <Switch
                  id="darkMode"
                  checked={settings.twoFactorAuth}
                  disabled={true}
                  onCheckedChange={() => handleSettingChange('twoFactorAuth')}
                  className={settings.twoFactorAuth === false ? ' bg-slate-500' : ' bg-red-500'}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                style={{ maxWidth: '350px' }}
              >
                <h1 className='font-normal text-lg'>Coming soon!</h1>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPasswords.currentPassword ? 'text' : 'password'}
                value={passwordFields.currentPassword}
                onChange={handlePasswordChange}
                className="bg-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.currentPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPasswords.newPassword ? 'text' : 'password'}
                value={passwordFields.newPassword}
                onChange={handlePasswordChange}
                className="bg-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.newPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                value={passwordFields.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.confirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
                <OAuthBtn
                  disabled={true}
                  click={() => {}}
                  provider='google'
                  icon={<GoogleIcon size={5}/>}
                  text={session?.user.oAuthProviders.indexOf('google') !== -1 ? "Disconnect Google" : 'Connect Google Account'} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-red-950 hover:bg-red-500">Save Changes</Button>
      </div>
    </form>
  )
}

