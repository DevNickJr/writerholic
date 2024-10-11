"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import type { ReactNode } from "react";
import ErrorImg from '@/assets/error-icon.png'


interface IProps {
    children?: ReactNode;
	onConfirm: () => void;
	open: boolean;
	close: () => void;
}

export default function ConfirmDeleteDialog({
	children,
	onConfirm,
	open,
	close,
}: IProps) {

	return (
		<>
			<Dialog open={open} onOpenChange={close}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="w-full max-w-[525px] max-h-[90dvh] overflow-auto">
					<DialogHeader>
						<DialogTitle>
							<div className="flex flex-col items-center gap-3 text-center">
								<Image src={ErrorImg} alt='Error' className='w-12 h-12 rounded-full md:w-16 md:h-16' />
								<p className='text-xl font-bold text-black'>You are about to delete this item</p>
							</div>
						</DialogTitle>
					</DialogHeader>
					<DialogFooter className="flex flex-col gap-3 sm:justify-center">
						<Button variant='outline' onClick={close}>Cancel</Button>
						<Button variant={'destructive'} onClick={() => onConfirm()}>Delete</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}