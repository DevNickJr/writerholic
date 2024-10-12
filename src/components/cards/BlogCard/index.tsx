import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IBlog } from "@/interfaces/schema"
import Link from "next/link";

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
      <CardFooter className="flex justify-between">
        <Link href={`/admin/blogs/${data._id}/edit`}>
          <Button variant="outline"  onClick={() => onEdit(data)}>Edit</Button>
        </Link>
        <Button onClick={() => onDelete(data._id!)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}
