"use client"
import React from 'react'
import Navbar from '@/Components/Navbar'
import SocialMedia from '@/Components/SocialMedia'
import Button2 from '@/Components/Button2'
import Background from '@/Components/Background'
const page = () => {
  return (
    <div className='bg-[#040907] h-screen text-white flex flex-col justify-between'>
      <Navbar />
      <Background className='' />
      <SocialMedia/>
      <Button2 className='self-center' text={"Lastest Works"} />
    </div>
  )
}

export default page;
