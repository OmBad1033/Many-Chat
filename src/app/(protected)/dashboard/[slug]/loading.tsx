import React from 'react'
import Loader from '@/components/global/loader'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <Loader state>...loading</Loader>
    </div>
  )
}

export default loading