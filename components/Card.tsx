
export default function Card ({children, backgroundImage, className, width, onClickHandler}: {children: React.ReactNode, backgroundImage: string, className: string, width: string, onClickHandler: () => void}) {
    return <div onClick={onClickHandler} className={["card", className || null].join(" ")} style={{"backgroundImage": backgroundImage ? `url(/${backgroundImage})` : null, minWidth: width || null}}>{children}</div>
}