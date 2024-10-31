"use client";
import React, { Suspense } from "react";
import Loader from '@/components/Loader'
import { usePagination } from "@/hooks/usePagination";
import { IComment, IPaginatedResult } from "@/interfaces/schema";
import { toast } from 'react-toastify'
import useFetch from "@/hooks/useFetch";
import useMutate from '@/hooks/useMutation'
import { apiGetComments, apiUpdateComment } from "@/services/CommentService";

const AdminComments = () => {

    const { limit, page } = usePagination();

    const { refetch } = useFetch<IPaginatedResult<IComment>>({
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
            toast.success("Comment Updated Successfully.")
            refetch()
        },
        showErrorMessage: true,
    })

    return (
        <Suspense>
            <div className="flex flex-col gap-y-5">
                {approveComment.isPending && <Loader />}
                <div id="search-and-filter" className="flex flex-col-reverse justify-between gap-3 md:flex-row">
                    {/* <div className="flex items-center w-full gap-3 md:flex-row">
                        <SearchBox
                            value={filters?.search || ''}
                            onChange={handleSearchChange}
                            placeholder="Search by name"
                            reset={reset}
                        />
                    </div> */}
                </div>
                {/* <div id="content">
                    <BaseTable
                        data={comments?.data || []}
                        columns={commentsColumnsMaker({ approve: (id, val: boolean) => approveComment.mutate({ approved: val, id }) })} 
                        onPaginationChange={onPaginationChange}
                        pageCount={Number(comments?.total)}
                        totalDocs={Number(comments?.total)}
                        pagination={pagination}
                        onSortingChange={() => ''}
                        sorting={[]}
                    />
                </div> */}
            </div>
        </Suspense>
    );
};

export default AdminComments;
