import React, { ReactNode } from 'react'

function CardsContainer({children, height, className, width}: {children: ReactNode, height: string , className: string, width: string}) {
  return (
    <div className={["cards-container", className || null].join(" ")} style={{"minHeight": height || null, "minWidth": width || null}}>
        {children}
    </div>
  )
}

export default CardsContainer

