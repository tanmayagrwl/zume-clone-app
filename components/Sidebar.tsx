
import React from 'react'
import { sideBarItems } from '../constants/SideBarItems'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Button from './Button'


function Sidebar() {

  return (
    <div className="container">
        <div className="header">
        <Image src="/logo.svg" width={40} height={40} alt="sidebar logo"/>  
        <p>ZUUM</p>
        </div> 
        <div className="items">
            {sideBarItems.map((item, index) => {
                return <Button key={index } item={item}/>
                  
            })}
        </div>
    </div>
  )
}

export default Sidebar