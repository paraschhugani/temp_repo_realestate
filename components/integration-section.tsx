import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function IntegrationSection() {
  return (
    <section className="section-padding bg-white" id="integration">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-gray-600 mb-6">
              Superu integrates effortlessly with your existing CRM and support systems. Our platform provides robust
              API capabilities and connector modules to ensure a smooth workflow without disrupting your current
              operations.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">
                  Connect with popular CRM systems like Salesforce, HubSpot, and more
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Integrate with helpdesk platforms such as Zendesk and Intercom</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Utilize our REST API for custom integrations with your tech stack</span>
              </li>
            </ul>
            <Link href="/integration" className="btn-secondary group-hover-arrow">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300" />
            </Link>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg"></div>
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-2">API Integration</h3>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>
                    {`// Example API call
const response = await fetch('https://api.superu.ai/v1/calls', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    phone: '+1234567890',
    agentId: 'sales_agent_1',
    context: { name: 'John Doe' }
  })
});`}
                  </pre>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm w-24 h-24 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    CRM 1
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-24 h-24 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    CRM 2
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-24 h-24 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    CRM 3
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm w-24 h-24 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    CRM 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

