import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { ActiveAutomation } from '@/icons/active-automation'

type Props = {}

export default function ActiveAutomationButton({}: Props) {
    // WIP: Set up optimistic UI also fetch some automation data
  return (
    <Button className='lg:px-10 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium ml-4' >
        <Loader state={false}>
            <ActiveAutomation />
            <p className='lg:inline hidden'>Activate</p>
        </Loader>
    </Button>
  )
}