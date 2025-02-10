'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SettingsLayout from '@/layouts/SettingsLayout'
const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Basic API testing',
      '1 Organization',
      '1 project',
      '1GB storage',
      'Up to 100 documents', 
      'Up to 5000 characters per document',
      'Community support'
    ],
    notIncluded: [
      'AI-powered assistance',
      'Team collaboration',
      'Advanced integrations'
    ]
  },
  {
    name: 'Pro',
    price: '$19',
    features: [
      'Advanced API testing',
      'Unlimited documentation of any size',
      'Unlimited projects',
      '20GB storage',
      'AI-powered assistance',
      'Team collaboration',
      'E-mail Support'
    ],
    notIncluded: [
      'Custom integrations'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Custom integrations',
      'Dedicated account manager',
      'Priority Support',
      'SLA',
      'On-premise deployment option'
    ],
    notIncluded: []
  }
]

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('Free')

  return (
    <SettingsLayout>
    <div className="space-y-8 w-full p-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
        <p className="text-lg">You are currently on the <span className="font-bold">{currentPlan}</span> plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.notIncluded.length > 0 && (
                <ul className="space-y-2">
                  {plan.notIncluded.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-400">
                      <X className="w-5 h-5 text-red-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${currentPlan === plan.name ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => setCurrentPlan(plan.name)}
              >
                {currentPlan === plan.name ? 'Current Plan' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </SettingsLayout>
  )
}

