"use client";
import Loader from '@/components/Loader'
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import BaseTable from "@/components/Table/base-table";
import { usePagination } from "@/hooks/usePagination";
import { IComment, IPaginatedResult } from "@/interfaces/schema";
import Header from "@/components/Table/table-header-item";
import { CheckboxIcon } from "@radix-ui/react-icons";
import useFetch from "@/hooks/useFetch";
import useMutate from '@/hooks/useMutation'
import { apiGetComments, apiUpdateComment } from "@/services/CommentService";
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'


const AdminComments: React.FC = () => {

    const { limit, onPaginationChange, page, pagination } = usePagination();

    const { data: comments, refetch } = useFetch<IPaginatedResult<IComment>>({
        api: apiGetComments,
        param: {
           page, 
           limit,
        },
        key: ["Comments", page, limit],
    })

    const approveComment = useMutate<Partial<IComment>, unknown>(
        apiUpdateComment, 
        {
        onSuccess: () => {
            toast.success("Comment Updated Successfully.")
            refetch()
        },
        showErrorMessage: true,
    })

    return (
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
            <div id="content">
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
            </div>
        </div>
    );
};

export default AdminComments;

const commentsColumnHelper = createColumnHelper<IComment>();

const commentsColumnsMaker = ({
    approve,
}: {
    approve: (id: string) => void
}) => {
    return [
        commentsColumnHelper.accessor("_id", {
            id: 'id',
            header: ({ column }) => <Header title="" column={column} />,
            sortingFn: "text",
            cell: () => <div>
                <CheckboxIcon className="w-3.5 h-3.5" />
            </div>,
        }),
        commentsColumnHelper.accessor("name", {
            id: 'name',
            header: ({ column }) => <Header title="Name" column={column} />,
            sortingFn: "text",
            cell: (info) => {
                return <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>
            },
        }),
        commentsColumnHelper.accessor("email", {
            id: 'email',
            header: ({ column }) => <Header title="Email" column={column} />,
            sortingFn: "text",
            cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
        }),
        commentsColumnHelper.accessor("website", {
            id: 'website',
            header: ({ column }) => <Header title="Website" column={column} />,
            sortingFn: "text",
            cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
        }),
        commentsColumnHelper.accessor("content", {
            id: 'content',
            header: ({ column }) => <Header title="Content" column={column} />,
            sortingFn: "text",
            cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
        }),
        commentsColumnHelper.accessor(row => row, {
            id: "actions",
            sortingFn: "text",
            cell: (info) => {
                const rowData = info.getValue(); 
                const id = rowData?._id?.toString();
                return (
                 <div className='flex items-center gap-2'>
                    <Button onClick={() => approve(id, true) } className='py-1 px-2 text-xs'>Approve</Button>
                    <Button variant='destructive' onClick={() => approve(id, false) } className='py-1 px-2 text-xs'>Decline</Button>
                 </div>
                );
            },
            header: ({ column }) => <Header title="Actions" column={column} className="flex justify-center" />,
        }),
    ] as ColumnDef<IComment>[];
}
