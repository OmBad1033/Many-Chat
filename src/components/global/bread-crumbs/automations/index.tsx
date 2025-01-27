import { PencilDuoToneBlack } from '@/icons'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActiveAutomationButton from '../../active-automation-button'

type Props = {
    id: string
}

export default function AutomationBreadCrumb({id}: Props) {
    // WIP: Fetch some automation data
    //USe mutation stuff to update the automations
  return (
    <div className='rounded-full w-full p-5 bg-[#18181B1A] flex items-center'>
        <div className="flex items-center gap-x-3 min-w-0">
            <p className="text-[#9B9CA0] truncate">Automations</p>
            <ChevronRight className='flex-shrink-0'color='#9B9CA0' />
            <span className="flex gap-x-3 items-center min-w-0">
                {/* WIP: Show editing data */}
                <p className="text-[#9B9CA0] truncate">This is the automation title</p>
                <span className='cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4'>
                    <PencilIcon size={16}/>
                </span>
            </span>
        </div>
        <div className="flex items-center gap-x-5 ml-auto">
            <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
                All the live automation will be displayed here!
            </p>
            <div className="flex gap-x-5 flex-shrink-0">
                <p className="text-text-secondary text-sm truncate min-w-0">
                    Saved Changes
                </p>
            </div>
        </div>
        <ActiveAutomationButton />
    </div>
  )
}