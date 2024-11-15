"use client"
import React, { useState } from 'react'
import AddTopicDialog from './AddTopic.dialog'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { apiDeleteTopic, apiGetTopics } from '@/services/TopicService'
import useFetch from '@/hooks/useFetch'
import { ITopic } from '@/interfaces/schema'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import ConfirmDeleteDialog from '@/components/modals/ConfirmDeleteDialog'
import Loader from '@/components/Loader'
import EditTopicDialog from './EditTopic.dialog'
import { TopicCard } from '@/components/cards/TopicCard'
import Search from '@/components/Search'

const Topics = () => {
    const [search, setSearch] = useState('')
    const { limit, page } = usePagination();

    const [deleteTopicId, setDeleteTopicId] = useState('')
    const [editTopic, setEditTopic] = useState<ITopic>()

    const { data: topics, refetch, isLoading } = useFetch<ITopic[]>({
        api: apiGetTopics,
        param: {
          search, page, limit, 
            // sort: { field, order },
        },
        key: ["topics", page, limit, search],
        requireAuth: true
    })

    const deleteTopicMutation = useMutate<string, unknown>(
        apiDeleteTopic,
    {
        onSuccess: () => {
            toast.success("Topic Deleted Successfully.")
            refetch()
            setDeleteTopicId('')
        },
        showErrorMessage: true,
        requireAuth: true,
        id: deleteTopicId,
    })

  return (
    <div>
			  {(isLoading || deleteTopicMutation.isPending) && <Loader />}
        <ConfirmDeleteDialog
          open={!!deleteTopicId}
          close={() => setDeleteTopicId('')}
          onConfirm={() => deleteTopicMutation.mutate(deleteTopicId)}
        />
        <EditTopicDialog
          // open={!!editTopic?._id}
          close={() => setEditTopic(undefined)}
          refetch={refetch}
          data={editTopic}
        />
        <Search value={search} onChange={(e: string) => setSearch(e)} />
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Topics</h2>
            <AddTopicDialog refetch={refetch}>
                <Button>Add a New Topic</Button>
            </AddTopicDialog>
        </div>
        <div className='mt-6 flex flex-wrap gap-3'>
          {
            topics?.map((el, index) => (
              <TopicCard
                key={index}
                data={el}
                onDelete={(id) => setDeleteTopicId(id)} 
                onEdit={(data: ITopic) => setEditTopic(data)} 
              />
            ))
          }
        </div>
    </div>
  )
}

export default Topics
