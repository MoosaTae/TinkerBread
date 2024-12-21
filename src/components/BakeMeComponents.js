'use client'
import { signOut } from 'next-auth/react'
import { VisitFriendButton } from '@/components/VisitFriendButton'
import { Button } from '@/components/Button'
import Link from 'next/link'

export function BakeMeComponents() {
  return (
    <div className='flex flex-col space-y-4'>
      <VisitFriendButton />
      <Link href='/setting'>
        <Button text='Setting' />
      </Link>
      <button
        onClick={() => {
          signOut()
        }}
      >
        <Button text='Sign Out' />
      </button>
    </div>
  )
}
