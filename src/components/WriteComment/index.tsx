'use client'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IReducerAction, IUserObj } from '@/interfaces'
import React, { FormEvent, useEffect, useReducer } from 'react'
import { IComment } from '@/interfaces/schema';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import useMutate from '@/hooks/useMutation';
import { apiAddComment } from '@/services/CommentService';
import { toast } from 'react-toastify';

const initialState: IComment = {
  name: '',
  email: '',
  website: '',
  content: '',
}

interface IProps {
  blog: string
}

const WriteComment = ({ blog }: IProps) => {
  const [data, dispatch] = useReducer((state: IComment, action: IReducerAction<IComment>) => {
    if (action.type === 'reset') {
      return initialState
    }
    if (action.type === 'setAll') {
      return { ...initialState, ...((action.payload && typeof action.payload === 'object') && action.payload) }
    }

    return { ...state, [action.type]: action.payload }
  }, initialState)

  useEffect(() => {
    if (localStorage) {
      const user = localStorage.getItem('user')
      if (user) {
        const values: IUserObj = JSON.parse(user)
        dispatch({ type: 'setAll', payload: { ...data, ...values } })
      }
    }
  }, [])

  const commentMutation = useMutate<IComment, unknown>(
    apiAddComment,
    {
      onSuccess: () => {
        dispatch({ type: 'content', payload: '' })
        toast.success("Your Comment has been sent.. It will be displayed after approval from blog owner")
      },
      showErrorMessage: true,
    }
  )

  const handleComment = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    localStorage.setItem('user', JSON.stringify({ email: data.email, name: data.name, website: data.website  }))
    commentMutation.mutate({ ...data, blog })
  }

  return (
    <section className='max-w-4xl mx-auto division section-bottom'>
      <h5 className='mb-10 text-xl md:text-2xl font-semibold'>Write a Comment</h5>
      <form onSubmit={handleComment} className='flex flex-col gap-4 md:gap-6'>
        <div className='flex flex-col gap-2'>
            <Label htmlFor="content">Comment <span className='text-red-600'>*</span></Label>
            <Textarea required value={data?.content} onChange={(e) => dispatch({ type: "content", payload: e.target.value })} name='content' id='content' rows={5} />
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4 md:gap-6'>
          <div className='flex flex-col gap-2 w-full'>
              <Label htmlFor="name">Name <span className='text-red-600'>*</span></Label>
              <Input required value={data?.name} onChange={(e) => dispatch({ type: "name", payload: e.target.value})} name='name' id='name' type="text" />
          </div>
          <div className='flex flex-col gap-2 w-full'>
              <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
              <Input required value={data?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} name='email' id='email' type="email" />
          </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
              <Label htmlFor="website">Website <span className='text-[0.6rem]'>(optional)</span></Label>
              <Input value={data?.website} onChange={(e) => dispatch({ type: "website", payload: e.target.value})} name='website' id='website' type="text" />
        </div>
        <div className='flex items-start'>
          <Button type='submit' className={`font-medium px-6 ${commentMutation?.isPending && 'animate-pulse'}`}>{commentMutation?.isPending ? "POSTING...." : "POST"}</Button>
        </div>
      </form>
  </section>
  )
}

export default WriteComment