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
import Loader from "@/components/Loader";
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingModal from "@/components/MeetingModal";
import ReactDatePicker from 'react-datepicker';

export default function HomePage () {

    const client = useStreamVideoClient();
    const { user } = useUser();
    const [callDetail, setCallDetail] = useState(null)
    const router = useRouter()
    const [dateTime, setDateTime] = useState("")
    const [desc, setDesc] = useState("")
    const [showSchedule, setShowSchedule] = useState(false)
    const { upcomingCalls } = useGetCalls(showSchedule)


    
    const createMeeting = async (schedule=true) => {
        if (!client) return;
        try {
          const id = crypto.randomUUID();
          const call = client.call('default', id);
          if (!call) throw new Error('Failed to create meeting');
          console.log("now", new Date(Date.now()).toISOString())
          console.log("expected", dateTime?.toISOString())
          const startsAt = dateTime?.toISOString() || new Date(Date.now()).toISOString();
          const description = desc || 'Instant Meeting';
          await call.getOrCreate({
            data: {
              starts_at: startsAt,
              custom: {
                description,
              },
            },
          });
          if(!schedule){
            setCallDetail(call);
            router.push(`/meeting/${call.id}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

    if(!client){
        return <Loader/>
    }

    console.log(upcomingCalls)

    return (<div className="home-outer">
        <CardsContainer height="303px">
            <Card backgroundImage="home-background.png" className="upcoming-container">
            </Card>
        </CardsContainer>
        <CardsContainer height="260px" className="meeting-actions">
            <Card width="260px" className="new" onClickHandler={() => {createMeeting(false)}}>
                <Image alt="new-meeting" src="/new-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">New Meeting</span> <br/> <span className="action-desc"> Setup a new recording </span></div>
            </Card>
            <Card width="260px" className="join">
                <Image alt="join-meeting" src="/join-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Join Meeting</span> <br/> <span className="action-desc"> via invitation link </span></div>
            </Card>
            <Card width="260px" className="schedule" onClickHandler={(e) => {setShowSchedule(true)}}>
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
            {upcomingCalls?.length>0 && <CardsContainer height="260px" className="upcoming-meetings-container">
              {upcomingCalls?.slice(0, 2).map(callData => (<Card width="260px" className="upcoming-meetings-card">
                <Image alt="view-recordings" src="/upcoming.svg" height="30" width="30"/>
                <div>
                  <div></div>
                </div>
              </Card>))}
            </CardsContainer>}               
        </SignedIn>
        <MeetingModal isOpen={showSchedule} title="Schedule Meeting" buttonText="Schedule Meeting" handleClick={() => {createMeeting();setShowSchedule(false);}} onClose={(e) => {setShowSchedule(false)}}>
          <div>
            <div className="mb-2"> Add a description </div>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-[#252A41]"></textarea>
          </div>
          <div>
            <div className="mb-2"> Select Date & Time </div>
            <div className="flex w-full flex-col gap-2.5">
            <ReactDatePicker
              selected={dateTime}
              onChange={(date) => setDateTime(date!)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 bg-[#252A41] focus:outline-none"
            />
            </div>
          </div>
        </MeetingModal>
    </div>)
}
