'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';
import ChatDialog from './chatDialog';

export default function Page() {
  const session = new useSession()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [username, setUsername] = useState(searchParams.get('username'))
  const [thxmessage, setThxMessage] = useState('thank you')
  const [GGBType, setGGBType] = useState('normal')

  
  const handleSubmit = async (e) => {
      e.preventDefault()    
     
      try {
        if (!username || !thxmessage) {
          throw new Error("please fill out form")
        }        

        const payload = {
          username,
          email,
          thanks_message: thxmessage,
          GGB_type: GGBType,
        }
        
        const res = await (await fetch(`api/auth/signup`, {
          method: "POST",
           headers: {
            'Content-Type': 'application/json',
            Origin: window.location.origin,
          },
          body: JSON.stringify({ payload }),
        })).json()
        
        if(res.message == 'failed'){
          throw new Error(res.error)
        }
                
        signIn('google')
      } catch (error) {      
        toast.error(error.message)
      }
    }
  return (
     <div className='mx-auto flex w-full flex-col  items-center'>
      <div className='absolute'><Toaster /></div>
      <ChatDialog username={username} setUsername={setUsername}
      thxmessage={thxmessage} setThxMessage={setThxMessage} GGBType={GGBType} setGGBType={setGGBType} email={email}/>

      <form
        onSubmit={handleSubmit}
        className="rounded-md bg-white p-6 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thxmessage">thanks message</label>
          <input
            id="thxmessage"
            type="thxmessage"
            value={thxmessage}
            onChange={(e) => setThxMessage(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2" 
          />
        </div>
        <div className="mb-4 flex flex-col space-y-2">
          <label htmlFor="thxmessage">thanks message</label>
         <select
            value={GGBType}
            onChange={e => setGGBType(e.target.value)}>
            {options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-500 py-2 text-white"
        >
          Save Change
        </button>
      </form>
    </div>
  )
}

const options = [
  'normal',
  'girl'
]