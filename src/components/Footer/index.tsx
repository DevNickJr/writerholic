import React from 'react'
import LOGO from '@/assets/logo-dark.png'
import Image from 'next/image'
import { MdLocationOn, MdMail, MdPhone } from 'react-icons/md'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='relative text-white border-none section grad-to-right dark:grad-to-right-dark division'>
        <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Section - Logo and About */}
        <div className="flex flex-col flex-1 gap-3">
            <div className="flex items-center gap-2">
            <Image src={LOGO} alt="Dordorian Logo" className="w-32 h-16 scale-75" width={200} height={200} />
            </div>
            <p className='text-base'>
                Where words come to life. Unlock the magic of storytelling and share in the journey of self-expression through the written word.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
                <BsFacebook className='w-6 h-6' />
                <BsTwitter className='w-6 h-6' />
                <BsLinkedin className='w-6 h-6' />
                <BsInstagram className='w-6 h-6' />
            </div>
        </div>
    
        {/* Right Section - Contact Information */}
        <div className="flex flex-col items-start justify-start flex-1 gap-3">
            <h2 className='text-lg font-bold'>Contact</h2>
    
            <div className="flex items-center justify-center gap-2">
                <MdPhone className='w-5 h-5' />
                <p className="">(+234) 806 000 8968</p>
            </div>
    
            <div className="flex items-center justify-center gap-2">
                <MdMail className='w-5 h-5' />
                <p className="">info@lunasdiary.com</p>
            </div>
    
            <div className="flex items-center justify-center gap-2">
                <MdLocationOn className='w-6 h-6' />
                <p className="">
                    First Floor, Amassoma, Bayelsa State, Nigeria
                </p>
            </div>
        </div>
    
        {/* Copyright */}
        <p className='absolute right-4 bottom-4'>© 2024 Lunasdiary Ltd. All rights reserved.</p>
        </div>
  </footer>
  
  )
}

export default Footer