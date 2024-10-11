'use client'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { MdNotifications } from 'react-icons/md'
import { Input } from '../ui/input'

interface IProps {
  value: string;
  onChange: (e: string) => void;
}

const SearchBar = ({ value, onChange }: IProps) => {

  return (
    <>
      <div className="flex items-center gap-3 mb-7 md:mb-10 md:pr-10">
          <div className="relative w-full bg-gray-50">
              <BiSearch className="absolute text-lg md:text-xl top-3 md:left-4 md:top-4 left-3 text-black/30" />
              <div className='relative w-full'>
                <Input className='p-2 md:p-3 pl-9 md:pl-11' type="text" name="searchbox" id="searchbox" value={value} placeholder='Search' onChange={(e) => onChange(e.target.value)} />
                {/* <span className='absolute top-0 left-0 z-10 w-full h-full bg-transparent cursor-pointer' /> */}
              </div>
          </div>
          <div className="flex items-center justify-center p-1.5 border rounded-md">
              <MdNotifications className="text-xl md:text-3xl" />
          </div>
      </div>
    </>
  )
}

export default SearchBar
