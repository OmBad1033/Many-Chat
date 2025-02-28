'use client'
import React from 'react'
import PaymentCard from './payment-card'
import { useQueryUser } from '@/hooks/use-queries'

type Props = {}

export default function Billing({}: Props) {
    const {data} = useQueryUser()

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
        <PaymentCard label="FREE" current={data?.data?.subscription?.plan!} />
        <PaymentCard label="PRO" current={data?.data?.subscription?.plan!} />
    </div>
  )
}