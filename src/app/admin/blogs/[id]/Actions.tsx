'use client'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/useFetch'
import useMutate from '@/hooks/useMutation'
import { IBlog, IPaginatedResult } from '@/interfaces/schema'
import { apiGetBlog, apiUpdateBlog } from '@/services/BlogService'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface IProps {
    blog: IBlog
}

const Actions = ({ blog }: IProps) => {
    const [deleteBlogId, setDeleteBlogId] = useState('')

    const { data, refetch } = useFetch<IPaginatedResult<IBlog>>({
        api: apiGetBlog,
        param: {
            id: blog._id
        },
        key: ["Blogs", blog._id],
        enabled: !!blog._id
    })

    const updateBlogMutation = useMutate<Partial<IBlog>, unknown>(
        apiUpdateBlog,
    {
        onSuccess: () => {
            toast.success("Blog Updated Successfully.")
            refetch()
            setDeleteBlogId('')
        },
        showErrorMessage: true,
        requireAuth: true,
        id: blog._id,
    })

  return (
    <div className='pb-12 border-b'>
        {updateBlogMutation.isPending && <Loader />}
        <h3 className='text-center mb-3'>Actions</h3>
        <div className='flex flex-wrap gap-4 justify-center'>
            <Button onClick={() => updateBlogMutation.mutate({ isFeatured: !blog.isFeatured, featuredAt: new Date() })} className={`font-medium px-6 text-xs`}>{blog.isFeatured ? 'Un-Feature' : 'Feature Blog'}</Button>
        </div>
    </div>
  )
}

export default Actions