import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 Footer-all-pages">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://cdn.prod.website-files.com/67a1abdaaf835294123e58bc/67a1b2a52838859820c21811_wordmark%20white-p-500.png"
                alt="Superu Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Superu is the no-code platform that empowers you to build human-like AI calling solutions effortlessly for
              inbound support and automated outbound sales.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/industry/health" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/industry/mortgage" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Mortgage
                </Link>
              </li>
              <li>
                <Link href="/industry/recruitment" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Recruitment
                </Link>
              </li>
              <li>
                <Link href="/industry/real-estate" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Real-Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Superu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

