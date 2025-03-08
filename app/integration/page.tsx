import Link from "next/link"
import { ArrowRight, Check, Code, Database, Server } from "lucide-react"

export default function IntegrationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Seamless Integration with Your Systems</h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect Superu with your existing tools and workflows to create a unified communication experience.
            </p>
            <Link href="/signup" className="btn-primary inline-flex items-center text-lg px-8 py-3 group">
              Get Started – First 1000 Calls Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Integration Options</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">REST API</h3>
              <p className="text-gray-600 mb-4">
                Integrate Superu with your applications using our comprehensive REST API with detailed documentation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Secure authentication</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive endpoints</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Detailed documentation</span>
                </li>
              </ul>
              <Link
                href="/docs/api"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
              >
                View API Docs
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-built Connectors</h3>
              <p className="text-gray-600 mb-4">
                Use our ready-made connectors for popular platforms to get up and running quickly.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Salesforce integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">HubSpot connector</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Zendesk & Intercom</span>
                </li>
              </ul>
              <Link
                href="/integrations"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
              >
                View Connectors
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Webhooks</h3>
              <p className="text-gray-600 mb-4">
                Receive real-time updates and event notifications with our webhook system.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Real-time event notifications</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Customizable payload formats</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Secure delivery with retries</span>
                </li>
              </ul>
              <Link
                href="/docs/webhooks"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
              >
                Learn About Webhooks
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Simple Integration</h2>
              <p className="text-gray-700 mb-6">
                Integrating Superu with your existing systems is straightforward. Our API is designed to be
                developer-friendly with clear documentation and examples.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quick setup with API keys</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">SDKs available for popular languages</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-50 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Dedicated support for integration assistance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-gray-800 rounded-t-lg py-3 px-4 text-white text-sm font-mono flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span>Example API Call</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-b-lg font-mono text-sm text-green-400 overflow-x-auto">
                <pre>
                  {`// Initialize the Superu client
const superu = new Superu({
  apiKey: 'YOUR_API_KEY'
});

// Create a new outbound call
const call = await superu.calls.create({
  phone: '+1234567890',
  agentId: 'sales_agent_1',
  context: {
    name: 'John Doe',
    interest: 'Premium Plan',
    lastContact: '2023-03-15'
  },
  callbackUrl: 'https://your-app.com/webhooks/calls'
});

console.log(\`Call initiated with ID: \${call.id}\`);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Integrate Superu?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get started with your first 1000 calls free and see how easily Superu integrates with your systems.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

