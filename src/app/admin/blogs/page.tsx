"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import useFetch from '@/hooks/useFetch'
import { IBlog, IPaginatedResult } from '@/interfaces/schema'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDeleteDialog'
import Loader from '@/components/Loader'
import { BlogCard } from '@/components/cards/BlogCard'
import Link from 'next/link'
import { apiAdminGetBlogs, apiDeleteBlog } from '@/services/BlogService'
import Search from '@/components/Search'
import EmptyImg from '@/assets/empty.svg'
import { Pagination } from '@/components/Pagination'
import Image from 'next/image'

const Blogs = () => {
    const [search, setSearch] = useState('')

    const [deleteBlogId, setDeleteBlogId] = useState('')
    const [, setEditBlog] = useState<IBlog>()
    const { limit, page, next, prev } = usePagination();

    const { data: blogs, refetch, isLoading, isFetching, isPlaceholderData } = useFetch<IPaginatedResult<IBlog>>({
        api: apiAdminGetBlogs,
        param: {
            search, page, limit,
        },
        key: ["Blogs", page, limit, search],
    })

    const deleteBlogMutation = useMutate<string, unknown>(
        apiDeleteBlog,
    {
        onSuccess: () => {
            toast.success("Blog Deleted Successfully.")
            refetch()
            setDeleteBlogId('')
        },
        showErrorMessage: true,
        requireAuth: true,
        id: deleteBlogId,
    })


  return (
    <div className='section-bottom'>
			  {(deleteBlogMutation.isPending || isLoading || (isFetching  && isPlaceholderData)) && <Loader />}
        <ConfirmDeleteDialog
          open={!!deleteBlogId}
          close={() => setDeleteBlogId('')}
          onConfirm={() => deleteBlogMutation.mutate(deleteBlogId)}
        />
        <Search value={search} onChange={(e: string) => setSearch(e)} />
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Blogs</h2>
            <Link href={'/admin/blogs/add-blog'}>
                <Button>Add a New Blog</Button>
            </Link>
        </div>
        {/* <div className='flex flex-wrap gap-3 mt-6'>
          {
            blogs?.data?.map((el, index) => (
              <BlogCard
                key={index}
                data={el}
                onDelete={(id) => setDeleteBlogId(id)} 
                onEdit={(data: IBlog) => setEditBlog(data)} 
              />
            ))
          }
        </div> */}
        <div className='flex flex-wrap gap-3'>
          {!!blogs?.total ?
            <div className="flex flex-col gap-12">
              {!!search && <div className="justify-center items-center flex flex-col w-full gap-3 text-center pb-3 border-b-2 text-lg md:text-2xl font-semibold capitalize">
                Search Results For: {search}
              </div> }
              <div className='flex flex-wrap gap-3 mt-6'>
                    {blogs?.data?.map((blog, index) => {
                      return (
                        <BlogCard
                          key={index}
                          data={blog}
                          onDelete={(id) => setDeleteBlogId(id)} 
                          onEdit={(data: IBlog) => setEditBlog(data)} 
                        />    
                      );
                    })}
              </div>
              <Pagination data={blogs} prev={prev} next={next} />
            </div>
            : 
            <div className="mt-6 sm:mt-10 min-h-96 justify-center items-center flex flex-col gap-3 text-center w-full">
              {
                !!search ? 
                <>
                  <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
                  <p className="text-sm md:text-lg">No matches were found for your search terms. Please try again with different keywords.</p>
                </>
                :
                <>
                  <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
                  <p className="text-sm md:text-lg">{isLoading ? "Loading Blogs ...." : "No blog has been posted"}</p>
                </>
                
              }
            </div>
          }
        </div>
    </div>
  )
}

export default Blogs
