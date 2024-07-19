'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!API_KEY) throw new Error('Stream API key is missing');
    let client
    if(user) {
      client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user?.id,
          name: user?.username || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider
      });
    } 
    else{
    let random_user_id = crypto.randomUUID()
    client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: "guest",
        type: "guest"
      }
    });
  }
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;