"use client"
import React, { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface IProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}


const SearchModal = ({ isOpen, setIsOpen }: IProps) => {
    const [search, setSearch] = useState('')
    const router = useRouter()
    
    const inputRef = useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
        if (isOpen && inputRef?.current) {
            inputRef?.current?.focus()
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const closeModal = () => {
        setSearch("")
        document.body.style.overflow = 'unset'
        setIsOpen(false)
}

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
          closeModal()
      }
    }

    const handleSearch = () => {
        router.push(`/blogs?search=${search}`)
        closeModal()
    }
  
    return (
        <>
        {
            // isOpen &&
                <div onClick={handleOutsideClick} className='fixed left-0 z-50 max-h-screen min-h-screen p-4 py-10 overflow-hidden md:p-8 md:py-10 bg-blac h-[100vh] w-[100vw] transition-all duration-500 backdrop-blur-[1.5px]' style={{
                    bottom: isOpen ? "0" : "-150%"
                  }}>
                    <div className="flex flex-col items-center w-full max-w-2xl pb-2.5 mx-auto overflow-hidden bg-white rounded-md md:rounded-xl h-fit">
                        <div className='relative w-full h-full'>
                            <div className="flex items-center gap-3">
                                <div className="relative w-full flex justify-between bg-gray-50">
                                    <BiSearch className="absolute text-lg md:text-xl top-1/2 -translate-y-1/2 left-3 text-black/30" />
                                    <Input onKeyUp={(e) => e.key == 'Enter' && handleSearch()} ref={inputRef} className='p-2 md:p-5 px-9 md:px-11 pr-20' type="text" name="searchbox" id="searchbox" value={search} placeholder='What are you looking for?' onChange={(e) => setSearch(e.target.value)} autoComplete="off" />
                                    <Button onClick={handleSearch} className="absolute text-xs md:text-sm top-1/2 -translate-y-1/2 right-0 md:right-1" >Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}

export default SearchModal