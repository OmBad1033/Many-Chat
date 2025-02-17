import { useQueryAutomation } from '@/hooks/use-queries'
import React from 'react'

type Props = {
    id: string
}

export default function Trigger({id}: Props) {
  // const {data} = useQueryAutomation(id);
  // if(data?.data && data?.data?.trigger.length > 0)
  // {
  //   console.log("Trigger", data?.data?.trigger);
  // }

  return (
    <div>Trigger</div>
  )
}