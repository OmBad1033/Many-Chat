import React from 'react'
import {
    Sheet as ShadCnSheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
    side: "left" | "right"
}

function Sheet({children, trigger, className, side}: Props) {
  return (
    <ShadCnSheet> 
        <SheetTrigger className={className}>{trigger}</SheetTrigger>
        <SheetContent side={side} className='p-0'>{children}</SheetContent>
    </ShadCnSheet>
  )
}

export default Sheet