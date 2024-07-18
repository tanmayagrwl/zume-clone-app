import { ReactNode } from "react"
import SideBar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"

export default function HomeLayout({children}: { 
    children: ReactNode
}) {
    return(
    <div className="home-container">
        <SideBar/>
        <div className="main-page">
            <Navbar/>
            {children}
        </div>
    </div>
)}