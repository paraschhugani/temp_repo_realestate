import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = ({
  searchParams,
}: {
  searchParams: { redirect_url?: string }
}) => {
  // Get the redirect URL from the search params or use the default
  const redirectUrl = searchParams.redirect_url || '/'

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

export default SignUpPage