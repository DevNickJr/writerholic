import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IBlog } from '@/interfaces/schema';
import Tag from '@/components/Blog/Tag';
import DarkTunImg from '@/assets/dark-tunnel.png';
// import DarkBooksImg from '@/assets/dark-books.png';
// import DarkBuildImg from '@/assets/dark-build.png';
// import DarkSeaImg from '@/assets/dark-sea.png';
// import DarkWolfImg from '@/assets/dark-wolf.png';

const HomeCoverSection = ({ blog }: { blog: IBlog }) => {
  return (
    <div className='inline-block w-full division'>
        <article className='flex flex-col items-start justify-end relative h-[60vh] sm:h-[85vh]'>
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/90 rounded-3xl z-0 ' />
            <Image src={DarkTunImg || blog.featuredImage}
                // placeholder='blur'
                // blurDataURL={blog.}
                alt={blog.title}
                fill
                className='object-cover object-center w-full h-full rounded-3xl'
                sizes='100vw'
                priority
            />

            <div className='z-0 flex flex-col items-start justify-center w-full p-6 text-white lg:w-3/4 sm:p-8 md:p-12 lg:p-16 text-light'>
                <Tag link={`/blogs`} name={'Explore'} />
                <Link href={'/blogs'} className='mt-6'>
                    <h1 className='text-lg font-bold capitalize sm:text-xl md:text-3xl lg:text-4xl'>
                        <span className='text-border-transition'>
                            Welcome to LunasDiary: A Journey Through Words
                            {/* {'Welcome to Writerholic: A Journey Through Words' || blog.title} */}
                        </span>
                    </h1>
                </Link>
                <p className='hidden mt-4 sm:inline-block md:text-lg lg:text-xl font-in'>
                    Exploring stories, thoughts, and inspiration one word at a time. Dive into the world of creativity and expression
                    {/* {blog.excerpt} */}
                </p>
            </div>
        </article>
    </div>
  )
}

export default HomeCoverSection