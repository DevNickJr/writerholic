"use client"
import React, { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Input } from '../ui/input';

interface IProps {
  value: string;
  onChange: (a: string) => void
}

const Search = ({ value, onChange }: IProps) => {
    
    const inputRef = useRef<HTMLInputElement | null>(null)
    // React.useEffect(() => {
    //     if (isOpen && inputRef?.current) {
    //         inputRef?.current?.focus()
    //     }
    //     if (isOpen) {
    //         document.body.style.overflow = 'hidden'
    //     } else {
    //         document.body.style.overflow = 'unset'
    //     }
    // }, [isOpen])


    return (
        <>
        {
                <div className='fixed top-0 left-0 z-50 max-h-screen min-h-screen p-4 py-20 overflow-hidden md:p-8 md:py-20 bg-black/50 h-[100vh] w-[100vw]'>
                    <div className="flex flex-col items-center w-full max-w-2xl p-5 mx-auto overflow-hidden bg-white rounded-md md:rounded-xl h-fit">
                        <div className='relative w-full h-full'>
                            <div className="flex items-center gap-3 mb-2 md:mb-4">
                                <div className="relative w-full bg-gray-50">
                                    <BiSearch className="absolute text-lg md:text-xl top-3 md:left-4 md:top-4 left-3 text-black/30" />
                                    <Input ref={inputRef} className='p-2 md:p-3 pl-9 md:pl-11' type="text" name="searchbox" id="searchbox" value={value} placeholder='Search' onChange={(e) => onChange(e.target.value)} autoComplete="off" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}

export default Search