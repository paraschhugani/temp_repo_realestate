'use client'
import type React from "react"
import Sidebar from "@/components/sidebar"
import "./dashboard.css"
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const router = useRouter();
  const { getToken, isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect_url=/dashboard`);
    }
  }, [isLoaded, isSignedIn]);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}

