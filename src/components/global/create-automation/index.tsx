import React from 'react'
import { Button } from '@/components/ui/button'
import { AutomationDuoToneWhite } from '@/icons'
import Loader from '../loader'

type Props = {}

function CreateAutomation({}: Props) {
    //wip: create automation in the database using mutate
  return (
    <Button className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium">
        <Loader state={false}>
        <AutomationDuoToneWhite />
        <p className='lg:inline hidden'>Create Automation</p>
        </Loader>
    </Button> 
  )
}

export default CreateAutomation