"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-ui-component/card"
import { Button } from "@/components/dashboard-ui-component/button"
import { Badge } from "@/components/dashboard-ui-component/badge"
import { Link, ExternalLink, Check, X } from "lucide-react"
import Image from "next/image"

export default function IntegrationView() {
  const integrations = [
    {
      id: "crm",
      name: "CRM Integration",
      description: "Connect your CRM system to sync contacts and call data",
      connected: true,
      logo: "🔄",
      options: [
        { name: "Salesforce", logo: "/images/integrations/salesforce.png" },
        { name: "HubSpot", logo: "/images/integrations/hubspot.png" },
        { name: "Zoho CRM", logo: "/images/integrations/zoho.png" },
      ],
    },
    {
      id: "calendar",
      name: "Calendar Integration",
      description: "Schedule calls and appointments directly from your calendar",
      connected: true,
      logo: "📅",
      options: [
        { name: "Google Calendar", logo: "/images/integrations/google-calendar.png" },
        { name: "Cal.com", logo: "/images/integrations/cal-com.png" },
        { name: "Calendly", logo: "/images/integrations/calendly.png" },
      ],
    },
    {
      id: "messaging",
      name: "Messaging Integration",
      description: "Send follow-up messages after calls via SMS or messaging platforms",
      connected: false,
      logo: "💬",
      options: [
        { name: "Twilio", logo: "/images/integrations/twilio.png" },
        { name: "MessageBird", logo: "/images/integrations/messagebird.png" },
        { name: "Slack", logo: "/images/integrations/slack.png" },
      ],
    },
    {
      id: "analytics",
      name: "Analytics Integration",
      description: "Export call data to your analytics platform",
      connected: false,
      logo: "📊",
      options: [
        { name: "Google Analytics", logo: "/images/integrations/google-analytics.png" },
        { name: "Mixpanel", logo: "/images/integrations/mixpanel.png" },
        { name: "Amplitude", logo: "/images/integrations/amplitude.png" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          API Documentation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="text-3xl">{integration.logo}</div>
                <CardTitle className="text-xl">{integration.name}</CardTitle>
              </div>
              <Badge variant={integration.connected ? "default" : "outline"}>
                {integration.connected ? "Connected" : "Not Connected"}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {integration.description}
              </CardDescription>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {integration.options.map((option) => (
                  <Card key={option.name} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="h-12 w-12 relative mb-2 flex items-center justify-center">
                        {option.logo ? (
                          <Image
                            src={option.logo || "/placeholder.svg"}
                            alt={option.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">{option.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-center">{option.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                {integration.options.map((option) => (
                  <div key={option.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-6 w-6 relative mr-2">
                        {option.logo ? (
                          <Image
                            src={option.logo || "/placeholder.svg"}
                            alt={option.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ) : (
                          <div className="h-6 w-6 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">{option.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <span>{option.name}</span>
                    </div>
                    {integration.connected ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant={integration.connected ? "outline" : "default"} className="w-full">
                <Link className="h-4 w-4 mr-2" />
                {integration.connected ? "Manage Connection" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

