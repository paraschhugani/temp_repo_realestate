import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
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
       
      </body>
    </html>
    </ClerkProvider>
  )
}



import './globals.css'