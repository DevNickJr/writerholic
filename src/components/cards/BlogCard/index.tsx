import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IBlog } from "@/interfaces/schema"
import Link from "next/link";
import { StatusEnum } from "@/interfaces";

interface IProps {
    data: IBlog;
    onDelete: (id: string) => void;
    onEdit: (val: IBlog) => void;
}

export function BlogCard({ data, onDelete, onEdit }: IProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4 justify-between">
        {/* <span className="text-sn">Status:</span> */}
        <span className={`p-1.5 text-sm rounded-full font-medium ${data.status === StatusEnum.draft ? "bg-yellow-200 text-yellow-500" : data.status === StatusEnum.archived ? "bg-gray-200 text-gray-500" : 'bg-green-200 text-green-600' }`}>{data.status}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <Link href={`/admin/blogs/${data._id}`}>
            <Button variant="outline">Manage</Button>
          </Link>
          <Link href={`/admin/blogs/${data._id}/edit`}>
            <Button variant="outline"  onClick={() => onEdit(data)}>Edit</Button>
          </Link>
        </div>
        <Button onClick={() => onDelete(data._id!)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}
