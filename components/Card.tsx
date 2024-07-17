"use client"

export default function Card ({children, backgroundImage, className, width, onClickHandler}: {children: ReactNode, backgroundImage: string}) {
    return <div onClick={onClickHandler} className={["card", className || null].join(" ")} style={{"backgroundImage": backgroundImage ? `url(/${backgroundImage})` : null, minWidth: width || null}}>{children}</div>
}