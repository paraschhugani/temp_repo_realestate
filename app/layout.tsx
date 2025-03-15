import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "sonner"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Superu - AI Voice Agents for Support & Sales",
  description:
    "Launch your AI voice agent for inbound support & automated outbound sales. Get started with your first 1000 calls free!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          expand={true}
          richColors
          closeButton
          toastOptions={{
            duration: 5000,
            style: {
              border: '1px solid',
              borderRadius: '0.5rem',
            },
          }}
        />
      </body>
    </html>
    </ClerkProvider>
  )
}



import './globals.css'