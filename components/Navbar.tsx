import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
function Navbar() {
  return (
    <div className='navbar-container'>
        <SignedIn>
            <SignOutButton/>
        </SignedIn>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
    </div>
  )
}

export default Navbar