import React from 'react'
import PaymentCard from './payment-card'

type Props = {}

export default function Billing({}: Props) {
    //wip: Fetch Biling info for the customer
  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
        <PaymentCard label="FREE" current="FREE" />
        <PaymentCard label="PRO" current="FREE" />

    </div>
  )
}