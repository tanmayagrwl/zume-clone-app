"use client"

import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { LogOut, LogIn } from 'lucide-react'
import { Button as ButtonUI } from './ui/button'
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Navbar() {
  const { user } = useUser();
  return (
    <div className='navbar-container'>
        <SignedIn>
          <SignOutButton>
            <ButtonUI className='ml-8 bg-blue-500 hover:bg-blue-600'> <LogOut className='mr-4'/> Logout </ButtonUI>
          </SignOutButton>
          {user && <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName[0] + user?.lastName[0]}</AvatarFallback>
          </Avatar>}
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <ButtonUI className='bg-blue-500 hover:bg-blue-600'> <LogIn className='mr-4'/> Login </ButtonUI>
          </SignInButton>
        </SignedOut>
    </div>
  )
}

export default Navbar