"use client";
import React, { Suspense } from "react";
import Loader from '@/components/Loader'
import { usePagination } from "@/hooks/usePagination";
import { IComment, IPaginatedResult } from "@/interfaces/schema";
import { toast } from 'react-toastify'
import useFetch from "@/hooks/useFetch";
import useMutate from '@/hooks/useMutation'
import { apiGetComments, apiUpdateComment } from "@/services/CommentService";
import { CommentCard } from '@/components/cards/CommentCard'
import Image from "next/image";
import LoadingImg from '@/assets/loading.svg'
import EmptyImg from '@/assets/empty.svg'
import { Pagination } from "@/components/Pagination";

const AdminComments = () => {
    const { limit, page, prev, next } = usePagination();

    const { refetch, isLoading, data: comments, isPlaceholderData, isFetching } = useFetch<IPaginatedResult<IComment>>({
        api: apiGetComments,
        param: {
           page, 
           limit,
        },
        key: ["Comments", page, limit],
    })

    const approveComment = useMutate<Partial<IComment> & { id: string; }, unknown>(
        apiUpdateComment, 
        {
        onSuccess: () => {
            toast.success("Operation Successful.")
            refetch()
        },
        showErrorMessage: true,
    })

    return (
        <Suspense>
            <div className="flex flex-col gap-y-5 section-bottom">
                {(isLoading || (isFetching  && isPlaceholderData) || approveComment.isPending) && <Loader /> }
                <h2 className='text-3xl font-bold text-black/80'>New Comments</h2>
                <p className='text-sm md:text-base mb-5'>Decide what comment shows up on your posts</p>
                {
                    (isLoading || !comments?.data) ? 
                    <div className="mt-6 sm:mt-10 flex min-h-96 justify-center items-center">
                        <Image src={LoadingImg} alt="Loading" height={300} width={300} className="" />
                    </div>
                    :
                    <>
                    {comments?.data ?
                    <>
                        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                comments?.data?.map((el, index) => (
                                <CommentCard
                                    key={index}
                                    data={el}
                                    action={(verdict: boolean) => approveComment.mutate({ approved: !!verdict, id: el._id || ''  })} 
                                />
                                ))
                            }
                        </div>
                        <Pagination data={comments} prev={prev} next={next} />
                    </>
                    : <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
                    }
                    </>
                }
            </div>
        </Suspense>
    );
};

export default AdminComments;
