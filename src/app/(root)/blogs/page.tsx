'use client'
import React, { useState } from "react";
import { IBlog, IPaginatedResult } from "@/interfaces/schema";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import { usePagination } from "@/hooks/usePagination";
import useFetch from "@/hooks/useFetch";
import { apiGetBlogs } from "@/services/BlogService";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import LoadingImg from '@/assets/loading.svg'
import EmptyImg from '@/assets/empty.svg'

interface IProps {
  params: {
      id: string;
  }
  searchParams?: { [key: string]: string | string[] | undefined };
}
const Blogs = ({ params: { id }, searchParams }: IProps) => {
  console.log({ searchParams })
  const [search, setSearch] = useState('')
    const { limit, page, next, prev } = usePagination();

    const { data: blogs, isLoading } = useFetch<IPaginatedResult<IBlog>>({
        api: apiGetBlogs,
        param: {
            page,
            limit,
        },
        key: ["Blogs", page, limit]
    })
  return (
    <section className="flex flex-col items-center justify-center w-full division section-bottom">
      {/* <div className="flex justify-between w-full">
        <h2 className="inline-block text-2xl font-bold capitalize w-fit md:text-4xl text-dark dark:text-light">
            More Articles
        </h2>
        <Link
          href="/categories/all"
          className="inline-block text-base font-medium underline underline-offset-2 md:text-lg"
        >
          view all
        </Link>
      </div> */}

      {
        isLoading ? 
        <div className="mt-6 sm:mt-10 flex min-h-96 justify-center items-center">
          <Image src={LoadingImg} alt="Loading" height={300} width={300} className="" />
        </div>
        :
        <>
        {blogs?.data ?
          <>
            <div className="grid grid-cols-1 gap-16 mt-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                  {blogs?.data?.map((blog, index) => {
                    return (
                        <article key={index} className="relative col-span-1 row-span-1">
                          <BlogLayoutThree blog={blog} />
                        </article>
                    );
                  })}
            </div>
            <Pagination data={blogs} prev={prev} next={next} />
          </>
          : <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
        }
        </>
      }

    </section>
  );
};

export default Blogs;
