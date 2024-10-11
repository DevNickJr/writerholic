'use client'
import { navItems } from '@/constants/nav-items'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TbLogout2 } from 'react-icons/tb'
import Image from 'next/image'
import Profile from "@/assets/lock.png"
import LogoutModal from '../modals/LogoutModal.tsx'

interface IProps {
    isOpen: boolean, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Links = ({ isOpen, setIsOpen }: IProps) => {
    const [logoutModalIsOpen, setLogoutModalOpen] = useState(false)
    const [collapse,] = useState(false)
    const pathname = usePathname();
    
    useEffect(() => {
        setIsOpen(false)
    }, [pathname, setIsOpen])
    
  


  return (
    <>
        <LogoutModal
            logout={() => ''}
            isOpen={logoutModalIsOpen} 
            setIsOpen={setLogoutModalOpen} 
        />
        <div className={`md:hidden shadow fixed top-0 right-0 w-5/6 min-h-screen h-screen bg-white text-black px-4 py-2 md:px-10 z-30 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300 rounded-tl-xl`}>
            <div className='h-full pt-16 mb-8 overflow-hidden'>
                <div className={`flex flex-col items-center gap-3 mb-10`}>
                    <Image src={Profile} alt={""} className='w-20 h-20 rounded-full cursor-pointer' />
                    <div className="flex flex-col items-center gap-1.5">
                        <h3 className={`text-xl font-bold`}>John Philip</h3>
                        <p className='text-xs text-black/70'>Operator</p>
                    </div>
                </div>
                <div className='h-full overflow-scroll text-sm pb-52 font-inter'>
                {
                            navItems?.map((navSection, index) => (
                                <div key={navSection.id} className={`${collapse ? "" : index===navItems.length-1 ? "" : "border-b mb-6 pb-5"} px-4`}>
                                    {
                                        navSection.title &&
                                            <h4 className={`${collapse ? "invisible" : ""} mb-5 text-xs uppercase`}>{navSection.title}</h4>
                                    }
                                    <div className='flex flex-col gap-3'>
                                        {
                                            navSection.navItems?.map((navItem) => (
                                                <Link key={navItem.id} href={navItem.link} className={`flex items-center gap-3 cursor-pointer rounded-md px-4 py-2.5 whitespace-nowrap ${collapse ? "justify-center" : ""} ${(pathname.includes(navItem.link) && navItem.link !== "/dashboard") ? "bg-secondary text-white font-semibold" : (pathname==="/dashboard" && navItem.link==="/dashboard") ? "bg-secondary text-white font-semibold" : ""}`}>
                                                    <div>
                                                        <navItem.Icon className={"text-lg"} />
                                                    </div>
                                                    <span className={`${collapse && "hidden"}`}>{navItem.title}</span>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                            
                        }
                        <button  onClick={() => setLogoutModalOpen(true)} className={`flex items-center gap-3 cursor-pointer font-medium rounded-md px-4 py-2.5 whitespace-nowrap text-[#F10A0A] mt-3 ml-4`}>
                            <TbLogout2 className={"text-lg"} />
                            <span className={`${collapse && "hidden"}`}>Logout</span>
                        </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Links