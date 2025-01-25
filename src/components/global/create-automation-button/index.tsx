import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { LaptopMinimalCheck } from 'lucide-react'

type Props = {}

export default function CreateAutomationButton({}: Props) {
    const isPending = false;
    //WIP: Create automation server action
  return (
    <Button className='lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium'>
        <Loader state={isPending}>
            <LaptopMinimalCheck />
            <p className="lg:inline hidden">Create an Automation</p>

        </Loader>
    </Button>
  )
}