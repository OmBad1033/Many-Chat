
import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import CreateAutomationButton from '@/components/global/create-automation-button'
import { Check, CircleCheckBig } from 'lucide-react'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  //WIP: connect real automation list
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-5'>
      <div className="lg:col-span-4">
        <AutomationList/>
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
          <div className='headingAndDescription'>
            <h2 className="text-xl">Automations</h2>
            <p className="text-text-secondary">
              All the live automations will be displayed here!
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {
              [1,2,3].map((item)=>(
                <div className="flex items-start justify-between" key={item}>
                  <div className="flex flex-col ">
                    <h3 className="font-medium">My clothes</h3>
                    <p className="text-text-secondary text-sm">
                      Automation description: Must Wash it!!
                    </p>
                  </div>
                  <CircleCheckBig/>
                </div>
              ))
            }
          </div>
          <CreateAutomationButton />
        </div>
      </div>
    </div> 
  )
}