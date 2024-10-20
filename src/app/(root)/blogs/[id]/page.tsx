import appConfig from '@/configs';
import { IBlog } from '@/interfaces/schema';
import Image from 'next/image';
import React from 'react'
import './styles.module.css'

interface IProps {
    params: {
        id: string;
    }
}

const Blog = async ({ params: { id } }: IProps) => {
    const blog: IBlog = await (await fetch(`${appConfig.apiPrefix}/blogs/${id}`)).json()

  return (
    <div className='blog'>
        <Image src={blog.featuredImage}
            alt={blog.title}
            width={100}
            height={100}
            className='object-cover object-center w-full h-full max-h-screen'
            // sizes='100vw'
            priority
        />
        <div className='max-w-6xl mx-auto division section' dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  )
}

export default Blog