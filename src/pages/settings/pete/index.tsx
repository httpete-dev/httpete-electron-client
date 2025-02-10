import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SettingsLayout from '@/layouts/SettingsLayout'

const PeteSettings = () => {
    const [gptApiKey, setGptApiKey] = useState('')
    const [gptUseInternet, setGptUseInternet] = useState(false)
  
    return (
      <SettingsLayout>
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">OpenAI Settings</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gptKey">API Key</Label>
              <Input
                id="gptKey"
                type="text"
                value={gptApiKey}
                onChange={(e) => setGptApiKey(e.target.value)}
                className="bg-gray-700 w-full max-w-2xl"
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gptModel">Default Model</Label>
                <select
                  id="gptModel"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  <option>GPT-4</option>
                  <option>GPT-3.5</option>
                  <option>GPT-3</option>
                  <option>Claude</option>
                  <option>Claude Instant</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webAccess">Web Access</Label>
                <select
                  id="webAccess"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  <option>Always Off</option>
                  <option>Off</option>
                  <option>Always ask</option>
                  <option>On</option>
                  <option>Always On</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
    )
  }
export default PeteSettings;