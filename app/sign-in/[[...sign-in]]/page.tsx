import { SignIn } from '@clerk/nextjs'

export default function Page({
  searchParams,
}: {
  searchParams: { redirect_url?: string }
}) {
  // Get the redirect URL from the search params or use the default
  const redirectUrl = searchParams.redirect_url || '/'

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
