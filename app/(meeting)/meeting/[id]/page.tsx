"use client"

import React, { useEffect, useState } from 'react'
import {
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    User,
  } from '@stream-io/video-react-sdk';
  import { useAuth } from "@clerk/nextjs";

  
  
  export const MyApp = ({params}) => {
   
    const apiKey = process.env.STREAM_API_KEY;
    const { userId, getToken } = useAuth();
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const user: User = { id: userId };

    useEffect(() => {
        const getUserToken = async () => {
            return await getToken()
        }   

        if(userId) {
            const token = getUserToken()
            setClient(new StreamVideoClient({ apiKey, user, token }));    
        }    
    }, [userId])


    useEffect(() => {
       if(client) {
        setCall(client.call('default', params.id))
       }    
    }, [client])

    useEffect(() => {
        const joinOrCreate = async () => {
            await call.getOrCreate();
        }
        
        if(call) {
            joinOrCreate()
        }    
     }, [call])

    return (<>
      {client && <StreamVideo client={client}>
            {call && <StreamCall call={call}>
                <StreamTheme>
                    <SpeakerLayout />
                    <CallControls />
                </StreamTheme>
            </StreamCall>}
        </StreamVideo>}
    </>
    );
  };

function Page() {
  return (
    <div>Page</div>
  )
}

export default Page