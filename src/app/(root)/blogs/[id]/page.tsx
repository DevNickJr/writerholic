"use client"
import { format, parseISO } from "date-fns";
import { IBlog, ITopic, IUser } from '@/interfaces/schema';
import Image from 'next/image';
import React from 'react'
import { MdChevronRight } from 'react-icons/md';
import Share from '@/components/Share';
import WriteComment from '@/components/WriteComment';
import ViewComments from '@/components/ViewComments'
import useFetch from '@/hooks/useFetch';
import { apiGetBlog } from '@/services/BlogService';


interface IProps {
    params: {
        id: string;
    }
}

const Blog = ({ params: { id } }: IProps) => {
    // const blog: IBlog = await (await fetch(`${appConfig.apiPrefix}/blogs/${id}`)).json()
    const { data: blog } = useFetch<IBlog>({
        api: apiGetBlog,
        param: {
            id: id
        },
        key: ["Blogs", id],
        enabled: !!id
    })

    // const { data: comments } = useFetch<IComment[]>({
    //     api: apiGetBlogComments,
    //     param: {
    //         id: id
    //     },
    //     key: ["Blogs", id, 'comments'],
    //     enabled: !!id
    // })
    

    // const blog: IBlog = await (await fetch(`${appConfig.apiPrefix}/blogs/${id}`)).json()

    // const comments: IComment[] = await (await fetch(`${appConfig.apiPrefix}/blogs/${id}/comments`)).json()

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
            <div className='max-w-6xl mx-auto division section' dangerouslySetInnerHTML={{ __html: blog.content }} />
            <section className='max-w-6xl mx-auto division section md:border-b-2 border-black/5 mb-10 flex flex-col gap-10 md:flex-row justify-between'>
                <div className='border-black/5 pb-10 md:pb-0 border-b md:border-none'>
                    <h5 className='block mb-2 text-sm font-semibold'>Share this post</h5>
                    <div className='flex items-center justify-between'>
                        <Share />
                    </div>
                </div>
                <div className='flex items-center gap-3 text-xs'>
                    {/* <span className='w-10 h-10 rounded-full bg-black/5'></span> */}
                    <div className='flex flex-col'>
                        <h6 className='text-sm italic mb-1'>Posted by <span className='font-semibold not-italic'>{(blog?.author as IUser)?.name}</span></h6>
                        <p className=''>{format(parseISO(blog.createdAt || ''), "LLLL d, yyyy")}</p>
                        {/* <span className=''>{(blog?.author as IUser)?.role}</span> */}
                    </div>
                </div>
            </section>
            <ViewComments id={id} />
            <WriteComment blog={id} />        
        </div>
    )
}

export default Blog