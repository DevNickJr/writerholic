"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutate from "@/hooks/useMutation";
import { IReducerAction } from "@/interfaces";
import { ITag } from "@/interfaces/schema";
import { apiAddTag } from "@/services/TagService";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { useReducer, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { toast } from "react-toastify";

const initialState: ITag = {
    title: '',
}

interface IProps {
    children: ReactNode;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ITag[], Error>>
	onSuccess?: () => void;
}

export default function AddTagDialog({
	children,
	refetch,
	// onSuccess = () => { },
}: IProps) {
	const [open, setOpen] = useState<boolean>(false);

    const [data, dispatch] = useReducer((state: ITag, action: IReducerAction<ITag>) => {
        if (action.type === 'reset') {
            return initialState;
        }
        return { ...state, [action.type]: action.payload }
    }, initialState)

    const addTagMutation = useMutate<ITag, unknown>(
        apiAddTag,
        {
          onSuccess: (data: unknown) => {
              console.log("data", data)
			  dispatch({ type: 'reset', payload: null })
              toast.success("Successful")
			  refetch()
              return setOpen(false)
          },
        }
    )

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTagMutation.mutate(data)
	};

	return (
		<>
			{addTagMutation.isPending && <Loader />}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="w-full max-w-[525px] max-h-[90dvh] overflow-auto">
					<DialogHeader>
						<DialogTitle>Add Tag</DialogTitle>
					</DialogHeader>
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
						<DialogFooter className="justify-center sm:justify-center items-center flex">
							<Button
								disabled={addTagMutation.isPending}
								type="submit"
								className="p-3 rounded w-full max-w-[280px] py-3.5 h-fit"
							>
								{addTagMutation.isPending
									? "Loading..."
									: "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}