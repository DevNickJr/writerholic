'use client'
import React, { Suspense } from "react";
import { IBlog, IPaginatedResult } from "@/interfaces/schema";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import { usePagination } from "@/hooks/usePagination";
import useFetch from "@/hooks/useFetch";
import { apiGetBlogs } from "@/services/BlogService";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import LoadingImg from '@/assets/loading.svg'
import EmptyImg from '@/assets/empty.svg'
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

const Blogs = () => {
  // const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const search = searchParams.has("search") ? searchParams.get('search') : ''
    const { limit, page, next, prev } = usePagination();


    const { data: blogs, isLoading, isPlaceholderData, isFetching } = useFetch<IPaginatedResult<IBlog>>({
        api: apiGetBlogs,
        param: {
            page,
            limit,
            search
        },
        key: ["Blogs", page, limit, search]
    })

  return (
    <section className="flex flex-col items-center justify-center w-full division section-bottom">
      {(isLoading || (isFetching  && isPlaceholderData)) && <Loader /> }
      {
        (isLoading || !blogs?.data) ? 
        <div className="mt-6 sm:mt-10 flex min-h-96 justify-center items-center">
          <Image src={LoadingImg} alt="Loading" height={300} width={300} className="" />
        </div>
        :
        <Suspense>
        {!!blogs?.total ?
          <div className="mt-6 sm:mt-10 flex flex-col gap-12">
            {!!search && <div className="justify-center items-center flex flex-col w-full gap-3 text-center pb-3 border-b-2 text-lg md:text-2xl font-semibold capitalize">
              Search Results For: {search}
            </div> }
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                  {blogs?.data?.map((blog, index) => {
                    return (
                        <article key={index} className="relative col-span-1 row-span-1">
                          <BlogLayoutThree blog={blog} />
                        </article>
                    );
                  })}
            </div>
            <Pagination data={blogs} prev={prev} next={next} />
          </div>
          : 
        <div className="mt-6 sm:mt-10 min-h-96 justify-center items-center flex flex-col gap-3 text-center">

          {
            !!search ? 
            <>
              <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
              <p className="text-sm md:text-lg">No matches were found for your search terms. Please try again with different keywords.</p>
              <SearchBar actionBtn={<Button className="text-xs">New Search</Button>} />
            </>
            :
            <>
              <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
              <p className="text-sm md:text-lg">There are no blogs at this time</p>
            </>
            
          }
          </div>
        }
        </Suspense>
      }

    </section>
  );
};

export default Blogs;
