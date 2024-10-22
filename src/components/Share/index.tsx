'use client'
import React, { useRef } from 'react'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineWhatsApp, AiOutlineLinkedin } from 'react-icons/ai'
import useCopyToClipboard from '@/hooks/useCopy'

const Share = () => {
    const { copy, message } = useCopyToClipboard()
    const location = useRef(() => window?.location?.href)


    // useEffect(() => {
    //     if (typeof window != 'undefined' && !!window) {
    //         location.current() = window?.location.current()?.href
    //     }
    // }, [])

  return (
        <div className='relative flex items-center gap-4'>
            {/* copy link */}
            <button
            className='flex items-center gap-3 text-primary'
            onClick={() => copy(location.current())}
            >
                <MdContentCopy className='text-lg' />
                {/* {message && 
                    <div className='absolute left-0 w-full h-full -bottom-16'>
                        <div className='p-2 rounded-md bg-green'>
                            {message}
                        </div>
                    </div>
                } */}
            </button>
            <a target='_blank' className='flex items-center gap-3 text-primary' href={`https://twitter.com/share?url=${location.current()}`}>
                <FaTwitter className='text-lg' />
            </a>
            <a target='_blank' className='relative flex items-center gap-3 text-primary' href={`https://www.facebook.com/sharer/sharer.php?u=${location.current()}`}>
                <FaFacebookF className='text-lg' />
            </a>
            <a target='_blank' className='flex items-center gap-3 text-primary' href={`https://api.whatsapp.com/send?text=${location.current()}`}>
                <AiOutlineWhatsApp className='text-lg' />
            </a>
            <a target='_blank' className='flex items-center gap-3 text-primary' href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.current()}&title=Claim%20Your%20Name&summary=&source=`}>
                <AiOutlineLinkedin className='text-lg' />
            </a>
        </div>
  )
}

export default Share