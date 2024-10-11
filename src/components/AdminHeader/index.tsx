'use client'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import Image from 'next/image'
import Links from './Links'
import Profile from "@/assets/lock.png"

const AdminHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className='sticky top-0 left-0 z-30 flex flex-col w-full bg-white shadow md:hidden'>
      <div className='flex items-center justify-between w-full gap-4 p-4 border-b'>
        <h1 className='text-xl font-medium text-secondary'>
            Dashboard
        </h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center w-8 h-8 gap-1'>
          {/* <Image src={Logo} className='w-12 h-12 md:h-12' alt='' /> */}
            {/* <Image src={''} alt="" className='object-cover w-full h-full bg-gray-100 rounded-full' /> */}
          </div>
          { isOpen ? 
            <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
            : <BiMenu onClick={() => setIsOpen(true)} className='relative z-50 text-3xl cursor-pointer md:hidden text-gray-dark' />
          }
          <Image src={Profile} alt={""} className='hidden w-8 h-8 rounded-md cursor-pointer md:block' />
        </div>
      </div>
      {/* <div className="flex items-center gap-3 p-1 px-4 text-xs text-black/60">
        <MdHome className="text-lg text-primary" />
        <span>/</span>
        <span>Customers</span>
      </div> */}
      <Links setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  )
}

export default AdminHeader