"use client"

import CardsContainer from "@/components/Cards";
import Card from "@/components/Card"
import Image from "next/image"
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import Link from "next/link";
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function HomePage () {

    const client = useStreamVideoClient();
    const { user } = useUser();
    const [callDetail, setCallDetail] = useState(null)
    const router = useRouter()

    const createMeeting = async () => {
        if (!client || !user) return;
        try {
          const id = crypto.randomUUID();
          const call = client.call('default', id);
          if (!call) throw new Error('Failed to create meeting');
          const startsAt = new Date(Date.now()).toISOString();
          const description = 'Instant Meeting';
          await call.getOrCreate({
            data: {
              starts_at: startsAt,
              custom: {
                description,
              },
            },
          });
          setCallDetail(call);
            router.push(`/meeting/${call.id}`);
        } catch (error) {
          console.error(error);
        }
      };
    

    return (<div className="home-outer">
        <CardsContainer height="303px">
            <Card backgroundImage="home-background.png" className="upcoming-container">
            </Card>
        </CardsContainer>
        <CardsContainer height="260px" className="meeting-actions">
            <Card width="260px" className="new" onClickHandler={createMeeting}>
                <Image alt="new-meeting" src="/new-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">New Meeting</span> <br/> <span className="action-desc"> Setup a new recording </span></div>
            </Card>
            <Card width="260px" className="join">
                <Image alt="join-meeting" src="/join-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Join Meeting</span> <br/> <span className="action-desc"> via invitation link </span></div>
            </Card>
            <Card width="260px" className="schedule">
                <Image alt="schedule-meeting" src="/schedule-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Schedule Meeting</span> <br/> <span className="action-desc"> Plan your meeting </span></div>
            </Card>
            <Card width="260px" className="view-recordings">
            <Image alt="view-recordings" src="/view-recordings.svg" height="56" width="56"/>
            <div><span className="action-header">View Recordings</span> <br/> <span className="action-desc"> Meeting recordings </span></div>
            </Card>
        </CardsContainer>
        <SignedIn>
            <div className="overview">
                <h2>Today’s Upcoming Meetings</h2>
                <span><Link href="/upcoming"> See all </Link></span>
            </div>
        </SignedIn>
    </div>)
}