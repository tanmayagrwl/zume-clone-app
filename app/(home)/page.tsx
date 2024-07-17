import CardsContainer, { Card } from "@/components/Cards";
import Image from "next/image"
export default function HomePage () {
    return (<>
        <CardsContainer height="303px">
            <Card backgroundImage="home-background.png" className="upcoming-container">
            </Card>
        </CardsContainer>
        <CardsContainer height="260px" width="1080px" className="meeting-actions">
            <Card width="260px" className="new">
                <Image src="/new-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">New Meeting</span> <br/> <span className="action-desc"> Setup a new recording </span></div>
            </Card>
            <Card width="260px" className="join">
                <Image src="/join-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Join Meeting</span> <br/> <span className="action-desc"> via invitation link </span></div>
            </Card>
            <Card width="260px" className="schedule">
                <Image src="/schedule-meeting.svg" height="56" width="56"/>
                <div><span className="action-header">Schedule Meeting</span> <br/> <span className="action-desc"> Plan your meeting </span></div>
            </Card>
            <Card width="260px" className="view-recordings">
            <Image src="/view-recordings.svg" height="56" width="56"/>
            <div><span className="action-header">View Recordings</span> <br/> <span className="action-desc"> Meeting recordings </span></div>
            </Card>
        </CardsContainer>
    </>)
}