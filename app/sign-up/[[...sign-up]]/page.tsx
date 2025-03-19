"use client"
import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  // Get the redirect URL from the search params or use the default
  const redirectUrl = searchParams.get('redirect_url') || '/'

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp 
        afterSignUpUrl={redirectUrl}
        routing="path"
        path="/sign-up"
      />
    </main>
  )
}