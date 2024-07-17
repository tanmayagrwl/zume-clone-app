"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Button({item}: {item: {link: String, image: String, name: String}}) {
   
    const pathName = usePathname()

    return (
    <div className={["button-container",pathName == item.link ? "active" : null].join(" ")}>
        <Link href={item.link}>
            <div className="button">
                { item.image && <Image alt={item.name} src={item.image} width={24} height={24}/> }
                <p> {item.name} </p>
            </div>
        </Link>
    </div>
)
}

export default Button