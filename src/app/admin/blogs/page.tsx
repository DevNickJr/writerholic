"use client"
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import useFetch from '@/hooks/useFetch'
import { IBlog } from '@/interfaces/schema'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDeleteDialog'
import Loader from '@/components/Loader'
import { BlogCard } from '@/components/cards/BlogCard'
import Link from 'next/link'
import { apiDeleteBlog, apiGetBlogs } from '@/services/BlogService'

const Blogs = () => {
    const [search, setSearch] = useState('')
    const { limit, page } = usePagination();

    const [deleteBlogId, setDeleteBlogId] = useState('')
    const [, setEditBlog] = useState<IBlog>()

    const { data: blogs, refetch } = useFetch<IBlog[]>({
        api: apiGetBlogs,
        param: {
            pagination: { page, limit },
        },
        key: ["Blogs", page, limit],
        requireAuth: true
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
    <div>
			  {deleteBlogMutation.isPending && <Loader />}
        <ConfirmDeleteDialog
          open={!!deleteBlogId}
          close={() => setDeleteBlogId('')}
          onConfirm={() => deleteBlogMutation.mutate(deleteBlogId)}
        />
        <SearchBar value={search} onChange={(e: string) => setSearch(e)} />
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Blogs</h2>
            <Link href={'/admin/blogs/add-blog'}>
                <Button>Add a New Blog</Button>
            </Link>
        </div>
        <div className='flex flex-wrap gap-3 mt-6'>
          {
            blogs?.map((el, index) => (
              <BlogCard
                key={index}
                data={el}
                onDelete={(id) => setDeleteBlogId(id)} 
                onEdit={(data: IBlog) => setEditBlog(data)} 
              />
            ))
          }
        </div>
    </div>
  )
}

export default Blogs
