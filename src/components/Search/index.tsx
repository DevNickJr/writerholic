"use client"
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Input } from '../ui/input';

interface IProps {
  value?: string;
  onChange: (a: string) => void
}

const Search = ({ onChange }: IProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [val, setVal] = useState('')
    const timer = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            onChange(val)
            // reset()
        }, 700)

        // Clean-up function to clear the timer when component unmounts or when the effect re-runs
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
    }, [val, onChange])

    return (
                // <div className='fixed top-0 left-0 z-50 max-h-screen min-h-screen p-4 py-20 overflow-hidden md:p-8 md:py-20 bg-black/50 h-[100vh] w-[100vw]'>
        <>
        {
                    <div className="flex flex-col items-center w-full mx-auto overflow-hidden h-fit mb-6 md:mb-8 rounded-md">
                        <div className="relative w-full rounded-md">
                            <BiSearch className="absolute text-lg md:text-xl top-3 md:left-4 md:top-1/2 md:-translate-y-1/2 left-3 text-black/30" />
                            <Input ref={inputRef} className='p-2 md:p-3 md:py-5 pl-9 md:pl-11' type="text" name="searchbox" id="searchbox" value={val} placeholder='Search' onChange={(e) => setVal(e.target.value)} autoComplete="off" />
                        </div>
                    </div>
        }
        </>
        // </div>
    )
}

export default Search