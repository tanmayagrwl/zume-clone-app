"use client"

import React from 'react'
import { sideBarItems } from '../constants/SideBarItems'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


function Sidebar() {
  const pathName = usePathname() 

  return (
    <div className="container">
        <div className="header">
        <Image src="/logo.svg" width={40} height={40} alt="sidebar logo"/>  
        <p>ZUUM</p>
        </div> 
        <div className="items">
            {sideBarItems.map(item => {
                return <div className={["item-container",pathName == item.link ? "active" : null].join(" ")}>
                  <Link key={item.name} href={item.link}>
                    <div className="item">
                      <Image src={item.image} width={24} height={24}/> 
                      <p> {item.name} </p>
                    </div>
                  </Link>
                </div>
            })}
        </div>
    </div>
  )
}

export default Sidebar