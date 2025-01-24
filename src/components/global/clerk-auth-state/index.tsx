import React from 'react'
import {
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs"
import {User} from 'lucide-react'
import Loader from '../loader'
import { Button } from '@/components/ui/button'

type Props = {}

function CLerkAuthState({}: Props) {
  return (
    <>
        <ClerkLoading> 
            <Loader state={true} className=''>
                <></>

            </Loader>

        </ClerkLoading>
        <SignedOut>
            <SignInButton>
                <Button className="rounded-xl bg-[#252525] text-white hover:bg-[#252325]/70 ">
                    <User />
                    Login
                </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton>
                <UserButton.UserProfileLink label="Dashboard" url={`/dashboard`} labelIcon={<User size={16}/>} />
            </UserButton>
        </SignedIn>

    </>
  )
}

export default CLerkAuthState