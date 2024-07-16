import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignIn
  } from '@clerk/nextjs'
function page() {
  return (
    <SignIn />
  )
}

export default page