import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignIn,
    SignUp
  } from '@clerk/nextjs'
function page() {
  return (
    <SignUp />
  )
}

export default page