import { onBoardUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  // const user = await onBoardUser();
  // if(user.status === 200 || user.status === 201) {
  //   return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}`)
  // }
  // return redirect('/sign-in')

  return (
    <div></div>
  )
}