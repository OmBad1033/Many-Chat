
import React from 'react'
import Sidebar from '@/components/global/sidebar'

type Props = {
    children: React.ReactNode
    params: { slug: string }
}

const layout = ({children, params}: Props) => {
    //WIP: Query client and fetch data
  return (
    <div className='p-3'>
        <Sidebar slug={params.slug}/>
        {/* <Navbar/> */}
        {children}
    </div>
  )
}

export default layout