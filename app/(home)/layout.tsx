import React from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'

function layout({children}) {
  return (
    <StreamVideoProvider>
        {children}
    </StreamVideoProvider>
  )
}

export default layout