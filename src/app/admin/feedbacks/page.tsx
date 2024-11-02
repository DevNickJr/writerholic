"use client";
import React, { Suspense } from "react";
import Loader from '@/components/Loader'
import { usePagination } from "@/hooks/usePagination";
import { IFeedback, IPaginatedResult } from "@/interfaces/schema";
import { toast } from 'react-toastify'
import useFetch from "@/hooks/useFetch";
import useMutate from '@/hooks/useMutation'
import { apiGetFeedbacks, apiUpdateFeedback } from "@/services/FeedbackService";
import { FeedbackCard } from '@/components/cards/FeedbackCard'
import Image from "next/image";
import LoadingImg from '@/assets/loading.svg'
import EmptyImg from '@/assets/empty.svg'
import { Pagination } from "@/components/Pagination";

const AdminFeedbacks = () => {

    const { limit, page, prev, next } = usePagination();

    const { refetch, isLoading, data: feedbacks, isPlaceholderData, isFetching } = useFetch<IPaginatedResult<IFeedback>>({
        api: apiGetFeedbacks,
        param: {
           page, 
           limit,
        },
        key: ["Feedbacks", page, limit],
    })

    console.log({ feedbacks })

    const approveFeedback = useMutate<Partial<IFeedback> & { id: string; }, unknown>(
        apiUpdateFeedback, 
        {
        onSuccess: () => {
            toast.success("Operation Successful.")
            refetch()
        },
        showErrorMessage: true,
    })

    return (
        <Suspense>
            <div className="flex flex-col gap-y-5">
                {(isLoading || (isFetching  && isPlaceholderData) || approveFeedback.isPending) && <Loader /> }
                <h2 className='text-3xl font-bold text-black/80'>New Feedbacks</h2>
                <p className='text-sm md:text-base mb-5'>Decide what comment shows up on your posts</p>
{/*                 
                <div id="search-and-filter" className="flex flex-wrap justify-between gap-3">
                    <div className='flex flex-wrap gap-3 mt-6='>
                        {
                            feedbacks?.data?.map((el, index) => (
                            <FeedbackCard
                                key={index}
                                data={el}
                                action={(verdict: boolean) => approveFeedback.mutate({ approved: !!verdict, id: el._id  })} 
                            />
                            ))
                        }
                    </div>
                </div> */}
                {
                    (isLoading || !feedbacks?.data) ? 
                    <div className="mt-6 sm:mt-10 flex min-h-96 justify-center items-center">
                    <Image src={LoadingImg} alt="Loading" height={300} width={300} className="" />
                    </div>
                    :
                    <>
                    {feedbacks?.data ?
                    <>
                        <div className="grid grid-cols-1 gap-16 mt-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                feedbacks?.data?.map((el, index) => (
                                <FeedbackCard
                                    key={index}
                                    data={el}
                                    action={(verdict: boolean) => approveFeedback.mutate({ approved: !!verdict, id: el._id  })} 
                                />
                                ))
                            }
                        </div>
                        <Pagination data={feedbacks} prev={prev} next={next} />
                    </>
                    : <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
                    }
                    </>
                }
            </div>
        </Suspense>
    );
};

export default AdminFeedbacks;
