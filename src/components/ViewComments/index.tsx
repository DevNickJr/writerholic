'use client'
import useInfiniteFetch from '@/hooks/useInfiniteFetch';
import { format, parseISO } from "date-fns";

import { Button } from '../ui/button';

interface IProps {
  id: string
}

const ViewComments = ({ id }: IProps) => {
    const pageSize = 2;
    const { data: comments, fetchNextPage, isFetchingNextPage } = useInfiniteFetch({ pageSize, id });

  return (
    <>
        {
                    comments?.pages && !!comments?.pages?.length &&
                    <section className='max-w-4xl mx-auto division section'>
                        <h5 className='mb-10 text-xl md:text-2xl font-semibold'>Comments</h5>
                        <div className='flex flex-col gap-4'>

                            {
                                comments?.pages?.map((page, index) => (
                                <div key={index}>
                                    {page.map((comment) => (
                                       <div key={comment._id} className="flex flex-col gap-5 border-b py-5">
                                            <h6 className='text-sm font-semibold'>FROM {comment.name}...</h6>
                                            <p className='text-sm'>{comment.content}</p>
                                            <span className='font-light text-sm'>{format(parseISO(comment.createdAt || ''), "LLLL d, yyyy - hh:mm a")}</span>
                                        </div>
                                    ))}
                                </div>)
                                )
                            }
                            <div className='flex justify-center py-5'>
                                <Button disabled={isFetchingNextPage  || ((comments.pages.at(-1)?.length || 0) < 1) || false} onClick={() => fetchNextPage()} type='submit' className={`font-medium px-6 text-xs disabled:cursor-not-allowed`}>LOAD MORE COMMENTS</Button>
                            </div>
                        </div>
                    </section>
                }
    </>
  )
}

export default ViewComments