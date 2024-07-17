import React from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'

function layout({children}) {
  return (
    <div><StreamVideoProvider>{children}</StreamVideoProvider></div>
  )
}

export default layout