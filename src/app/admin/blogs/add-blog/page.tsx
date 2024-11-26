"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutate from "@/hooks/useMutation";
import { IReducerAction, StatusEnum } from "@/interfaces";
import { IBlog, ITag, ITopic } from "@/interfaces/schema";
import { apiAddBlog } from "@/services/BlogService";
import React, { useReducer, useRef } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";
import TinyEditor from "@/components/Editor";
import useImage from "@/hooks/useImage";
import { Editor } from "tinymce"
import { apiGetAllTopics } from "@/services/TopicService";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiGetAllTags } from "@/services/TagService";
import { MdClose } from "react-icons/md";


const initialState: IBlog = {
    title: '',
    content: '',
    slug: '',
    author: '',
    featuredImage: '',
    excerpt: '',
    status: StatusEnum.published,
    readingTime: '',
    views: '',
    topic: '',
    isFeatured: false,
    likes: 0,
    tags: [],
}

const Status: Record<StatusEnum, string>= {
    Draft: 'draft',
    Published: 'publish',
    Archived: 'archive',

}

const AddBlog = () => {
    const [data, dispatch] = useReducer((state: IBlog, action: IReducerAction<IBlog>) => {
        if (action.type === 'reset') {
            return initialState;
        }
        return { ...state, [action.type]: action.payload }
    }, initialState)
    const { url: img, uploadImage: uploadImg, loading: uploadingImg } = useImage()
    const router = useRouter()

    console.log({ data })

    const ref = useRef<Editor | null>(null)

    const { data: topics } = useFetch<ITopic[]>({
        api: apiGetAllTopics,
        key: ["topics", 'all'],
        requireAuth: true
    })
    const { data: tags } = useFetch<ITag[]>({
        api: apiGetAllTags,
        key: ["tags", 'all'],
        requireAuth: true
    })

    const addBlogMutation = useMutate<IBlog, unknown>(
        apiAddBlog,
        {
          onSuccess: (data: unknown) => {
              console.log("data", data)
			  dispatch({ type: 'reset', payload: null })
              ref?.current?.setContent("")
              toast.success("Successful")
              router.push('/admin/blogs')
              return
          },
        }
    )

    const addTag = (tag: string) => {
        if (!tag) return
        const tags = (data.tags || []).filter(tg => tg !== tag)
        dispatch({ type: "tags", payload: [...tags, tag] })
    }
    const removeTag = (tag: string) => {
        if (!tag) return
        const tags = (data.tags || []).filter(tg => tg !== tag)
        dispatch({ type: "tags", payload: [...tags] })
    }

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        if (!img) {
          return toast.info("upload Featured Image")
        }
        addBlogMutation.mutate({ ...data, featuredImage: img, content: ref?.current?.getContent() || "" })
	};

  return (
    <div>
	    {(addBlogMutation.isPending || uploadingImg) && <Loader />}
        <div className="flex flex-col gap-1 mb-6">
            <h1 className="text-lg font-semibold leading-none tracking-tight md:text-2xl">Add Blog</h1>
            <p className="text-sm">Create a Blog Post</p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="">
                    Title
                </Label>
                <Input
                    id="title"
                    name="title"
                    placeholder=""
                    className=""
                    value={data.title}
                    onChange={(e) => dispatch({ type: 'title', payload: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="image">
                    <Label className="">
                        Featured Image
                    </Label>
                    {
                        (data.featuredImage || img) ?
                        <Image src={img || data.featuredImage} alt="" width={200} height={200} className="w-full rounded-md max-w-96 max-h-72" />
                        :
                        <Label htmlFor="image" className="flex w-full px-4 py-2 text-sm transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 :outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                    }
                </label>
                <Input
                    id="image"
                    name="image"
                    onChange={(e) => uploadImg(e.target.files![0])}  type="file" placeholder={img || data.featuredImage || ''}
                    className="hidden w-0 h-0"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="">
                    Excerpt
                </Label>
                <Input
                    id="excerpt"
                    name="excerpt"
                    placeholder=""
                    className=""
                    value={data.excerpt}
                    onChange={(e) => dispatch({ type: 'excerpt', payload: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="">
                    Select Topic
                </Label>
                <Select value={data.topic ? data.topic?.toString() : ''} onValueChange={(value) => dispatch({ type: 'topic', payload: value })}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select Topic</SelectLabel>
                            {
                                topics?.map(topic => (
                                    <SelectItem key={topic._id} value={topic._id || ''}>{topic.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="">
                    Select Tags
                </Label>
                <Select onValueChange={(value) => addTag(value)}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select Tags</SelectLabel>
                            {
                                tags?.map(tag => (
                                    <SelectItem key={tag._id} value={tag._id || ''}>{tag.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-2 flex-wrap">
                    {
                        data?.tags?.map(tag => (
                            <div key={tag} className="text-[10px] rounded-md p-1 bg-gray-50 text-gray-400 flex gap-1 items-center">
                                {tags?.find(val => val._id === tag)?.title || ''}
                                <MdClose onClick={() => removeTag(tag)} className="text-xs cursor-pointer" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="">
                    Select Status
                </Label>
                <Select value={data.status} onValueChange={(value) => dispatch({ type: 'status', payload: value })}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {
                                Object.values(StatusEnum).map(status => (
                                    <SelectItem key={status} value={status}>{Status[status]}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="">
                    Content
                </Label>
                <TinyEditor ref={ref} />
            </div>
            <div className="flex flex-col-reverse items-center justify-center sm:flex-row sm:space-x-2 sm:justify-center">
                <Button
                    disabled={addBlogMutation.isPending}
                    type="submit"
                    className="p-3 rounded w-full max-w-[280px] py-3.5 h-fit"
                >
                    {addBlogMutation.isPending
                        ? "Loading..."
                        : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AddBlog