import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ITopic } from "@/interfaces/schema"

interface IProps {
    data: ITopic;
    onDelete: (id: string) => void;
    onEdit: (val: ITopic) => void;
}

export function BlogCard({ data, onDelete, onEdit }: IProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline"  onClick={() => onEdit(data)}>Edit</Button>
        <Button onClick={() => onDelete(data._id!)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}
