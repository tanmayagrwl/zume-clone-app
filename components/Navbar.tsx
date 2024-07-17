import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import Button from './Button'
function Navbar() {
  return (
    <div className='navbar-container'>
        <SignedIn>
            <SignOutButton/>
        </SignedIn>
        <SignedOut>
            <Button item={{name: "Login", link:"/sign-in", image: ""}}/>
        </SignedOut>
    </div>
  )
}

export default Navbar