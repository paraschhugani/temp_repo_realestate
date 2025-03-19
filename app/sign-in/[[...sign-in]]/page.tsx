"use client"
import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  // Get the redirect URL from the search params or use the default
  const redirectUrl = searchParams.get('redirect_url') || '/'

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn 
        afterSignInUrl={redirectUrl}
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}
