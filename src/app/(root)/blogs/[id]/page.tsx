import appConfig from '@/configs';
import { IBlog, ITopic, IUser } from '@/interfaces/schema';
import Image from 'next/image';
import React from 'react'
import './styles.module.css'
import { MdChevronRight } from 'react-icons/md';
import Share from '@/components/Share';

interface IProps {
    params: {
        id: string;
    }
}

const Blog = async ({ params: { id } }: IProps) => {
    const blog: IBlog = await (await fetch(`${appConfig.apiPrefix}/blogs/${id}`)).json()

    if (!blog) return null

  return (
    <div className='blog'>
        <div className='flex flex-col items-center max-w-3xl px-4 py-12 pt-8 mx-auto text-center md:py-20 division'>
            <div className='flex items-center gap-1 mb-5 text-xs'>
                Blog
                <MdChevronRight size="1.3rem" />
                <span className='font-medium'>
                    {(blog.topic as ITopic)?.title}    
                </span>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
                <h1 className=''>{blog.title}</h1>
                <p className='text-base md:text-lg'>{blog.excerpt}</p>
            </div>
            {/* <div className='flex items-start items-center justify-between text-xs'>
                <div className='flex items-center gap-3'>
                    <span className='w-10 h-10 rounded-full bg-black/5'></span>
                    <div className='flex flex-col gap-1'>
                        <span className='font-semibold'>{(blog?.author as IUser)?.name || 'Anonymous'}</span>
                        <p>{blog.readingTime || 5} mins read</p>
                    </div>
                </div>
            </div> */}
        </div>
 
        <Image src={blog.featuredImage}
            alt={blog.title}
            width={100}
            height={100}
            className='object-cover object-center w-full h-full max-h-screen division'
            // sizes='100vw'
            priority
        />
        <div className='max-w-6xl mx-auto division' dangerouslySetInnerHTML={{ __html: blog.content }} />
        <section className='max-w-6xl mx-auto division section'>
            <div className='pb-10 mb-10 border-b-2 border-black/5'>
                <span className='block mb-2 text-sm font-semibold'>Share this post</span>
                <div className='flex items-center justify-between'>
                    <Share />
                </div>
            </div>
            <div className='flex items-center gap-3 text-xs'>
                <span className='w-10 h-10 rounded-full bg-black/5'></span>
                <div className='flex flex-col'>
                    <span className='font-semibold'>{(blog?.author as IUser)?.name}</span>
                    <span className=''>{(blog?.author as IUser)?.role}</span>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Blog