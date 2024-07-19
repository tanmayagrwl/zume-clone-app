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
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingModal from "@/components/MeetingModal";
import ReactDatePicker from 'react-datepicker';
import CallList from "@/components/CallList";
import Moment from "moment";

export default function HomePage () {

    const client = useStreamVideoClient();
    const { user } = useUser();
    const [callDetail, setCallDetail] = useState(null)
    const router = useRouter()
    const [dateTime, setDateTime] = useState("")
    const [desc, setDesc] = useState("")
    const [showSchedule, setShowSchedule] = useState(false)
    
    const [showJoin, setShowJoin] = useState(false)
    const idRef = useRef(null)

    const { upcomingCalls, todayCalls } = useGetCalls()


    
    const createMeeting = async (schedule=true) => {
        if (!client) return;
        try {
          const id = crypto.randomUUID();
          const call = client.call('default', id);
          if (!call) throw new Error('Failed to create meeting');

          const startsAt = dateTime ? dateTime?.toISOString() : new Date(Date.now()).toISOString();
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

    return (<div className="home-outer">
        <CardsContainer height="303px">
            <Card backgroundImage="home-background.png" className="upcoming-container">
              
            </Card>
            <div className="upcoming-container-superimpose">
                <div>{todayCalls?.length>0 && <SignedIn>
                  <div className="next-meeting">Upcoming Meeting at: {Moment(todayCalls?.[0].state.startsAt).format("hh:mm a")}</div>
                </SignedIn>}</div>
                <div>
                  <div>
                    <span className="text-[72px] font-bold">{Moment(new Date()).format("hh:mm")}</span>
                    <span className="text-[24px] ml-1">{Moment(new Date()).format("a").toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-[24px]">{Moment(new Date()).format("dddd, D MMM YYYY")}</span>
                  </div>
                </div>
            </div>
        </CardsContainer>
        <CardsContainer height="260px" className="meeting-actions">
            <Card width="260px" className="new" onClickHandler={() => {createMeeting(false)}}>
                <Image alt="new-meeting" src="/new-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">New Meeting</span> <br/> <span className="action-desc"> Setup a new recording </span></div>
            </Card>
            <Card width="260px" className="join" onClickHandler={() => {setShowJoin(true)}}>
                <Image alt="join-meeting" src="/join-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Join Meeting</span> <br/> <span className="action-desc"> via invitation link </span></div>
            </Card>
            <Card width="260px" className="schedule" onClickHandler={(e) => {setShowSchedule(true)}}>
                <Image alt="schedule-meeting" src="/schedule-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Schedule Meeting</span> <br/> <span className="action-desc"> Plan your meeting </span></div>
            </Card>
            <Card width="260px" className="view-recordings" onClickHandler={(e) => {router.push("/recordings")}}>
            <Image alt="view-recordings" src="/view-recordings.svg" height="56" width="56"/>
            <div><span className="action-header">View Recordings</span> <br/> <span className="action-desc"> Meeting recordings </span></div>
            </Card>
        </CardsContainer>
        <SignedIn>
            <div className="overview">
              { todayCalls?.length > 0 ? <>
                <h2 className="text-[30px] font-semibold">Today’s Upcoming Meetings</h2>
                <span><Link href="/upcoming"> See all </Link></span>
                </> : <h2 className="text-[30px] font-semibold">You're all caught up for today</h2> }
            </div>
            <CallList type='today' />        
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
        <MeetingModal isOpen={showJoin} title="Join Meeting" buttonText="Join" handleClick={() => {router.push(idRef.current.value)}} onClose={(e) => {setShowJoin(false)}}>
          <div>
            <div className="mb-2"> Enter Meeting ID </div>
            <input ref={idRef} className="w-full bg-[#252A41]" name="meeting-id"></input>
          </div>
        </MeetingModal>
    </div>)
}
