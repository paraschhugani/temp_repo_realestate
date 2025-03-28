"use client"

import { cn } from "@/lib/utils"
import { Users, Phone, PhoneIncoming, PhoneOutgoing, ClipboardList, LinkIcon, Settings, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import UserAvatar from "@/components/user-avatar"


export default function Sidebar() {
  const pathname = usePathname()
  const dashboard = true

  // Split the menu items into main items and footer items
  const menuItems = [
    { id: "agents", label: "Agents", icon: Users, path: "/dashboard/agents" },
    { id: "phone-numbers", label: "Phone Numbers", icon: Phone, path: "/dashboard/phone-numbers" },
    { id: "inbound", label: "Inbound Campaign", icon: PhoneIncoming, path: "/dashboard/inbound" },
    // { id: "outbound", label: "Outbound Campaign", icon: PhoneOutgoing, path: "/dashboard/outbound" },
    // { id: "audience", label: "Audience", icon: Target, path: "/dashboard/audience" },
    { id: "call-logs", label: "Call Logs", icon: ClipboardList, path: "/dashboard/call-logs" },
    // { id: "integration", label: "Integration", icon: LinkIcon, path: "/dashboard/integration" },
  ]

  const footerItems = [{ id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" }]

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Update the return statement to render the main items at the top and footer items at the bottom
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-6">
        <Link href="/dashboard" className="w-full flex justify-center">
          <Image src="/images/dashbaord-logo.png" alt="SuperU Logo" width={120} height={60} className="h-auto" />
        </Link>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center w-full px-6 py-3 text-left",
                    "transition-colors duration-200",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {/* <div className="mt-auto mb-1">
        <ul>
          {footerItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center w-full px-6 py-3 text-left justify-between",
                    "transition-colors duration-200",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  )}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </div>
                  
                  <div className="w-9 h-9">
                    {item.label === "Settings" && (
                      <UserAvatar dashboard={true}/>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div> */}
    </aside>
  )
}

