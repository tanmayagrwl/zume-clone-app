import { ReactNode } from "react"
import SideBar from "@/components/Sidebar"
// import classes from "./layout.module.css"
export default function HomeLayout({children}: { 
    children: ReactNode
}) {
    return(
    <div className="home-container">
        <SideBar/>
        <div className="main-page">
            Navbar
            {children}
        </div>
    </div>
)}