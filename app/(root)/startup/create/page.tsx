import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const session = await auth();
  if(!session || !session.user) redirect('/');
  
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">Startup Creation</p>
        <h1 className="heading">Submit Your Startup Pitch</h1>
        <p className="sub-heading !max-w-5xl">Share your startup idea with the world and connect with like-minded entrepreneurs.</p>
      </section>
      <StartupForm/>
    </>
  )
}

export default page
