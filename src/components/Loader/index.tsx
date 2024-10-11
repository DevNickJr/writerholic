"use client"
import React from 'react'
import { Rings } from 'react-loader-spinner'


const Loader = () => {
  return (
      <div className='backdrop-blur-[1px] bg-black/5 fixed top-0 left-0 w-full h-full z-50'>
          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
            <Rings
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
          </div>
      </div>
  )
}

export default Loader