"use client"
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'
import AddTagDialog from './AddTag.dialog'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { apiDeleteTag, apiGetTags } from '@/services/TagService'
import useFetch from '@/hooks/useFetch'
import { ITag } from '@/interfaces/schema'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDeleteDialog'
import Loader from '@/components/Loader'
import EditTagDialog from './EditTag.dialog'
import { TagCard } from '@/components/cards/TagCard'

const Tags = () => {
    const [search, setSearch] = useState('')
    const { limit, page } = usePagination();

    const [deleteTagId, setDeleteTagId] = useState('')
    const [editTag, setEditTag] = useState<ITag>()

    const { data: tags, refetch } = useFetch<ITag[]>({
        api: apiGetTags,
        param: {
            pagination: { page, limit },
            // sort: { field, order },
        },
        key: ["Tags", page, limit],
        requireAuth: true
    })

    const deleteTagMutation = useMutate<string, unknown>(
        apiDeleteTag,
    {
        onSuccess: () => {
            toast.success("Tag Deleted Successfully.")
            refetch()
            setDeleteTagId('')
        },
        showErrorMessage: true,
        requireAuth: true,
        id: deleteTagId,
    })

  return (
    <div>
			  {deleteTagMutation.isPending && <Loader />}
        <ConfirmDeleteDialog
          open={!!deleteTagId}
          close={() => setDeleteTagId('')}
          onConfirm={() => deleteTagMutation.mutate(deleteTagId)}
        />
        <EditTagDialog
          // open={!!editTag?._id}
          close={() => setEditTag(undefined)}
          refetch={refetch}
          data={editTag}
        />
        <SearchBar value={search} onChange={(e: string) => setSearch(e)} />
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Tags</h2>
            <AddTagDialog refetch={refetch}>
                <Button>Add a New Tag</Button>
            </AddTagDialog>
        </div>
        <div className='mt-6 flex flex-wrap gap-3'>
          {
            tags?.map((el, index) => (
              <TagCard
                key={index}
                data={el}
                onDelete={(id) => setDeleteTagId(id)} 
                onEdit={(data: ITag) => setEditTag(data)} 
              />
            ))
          }
        </div>
    </div>
  )
}

export default Tags
