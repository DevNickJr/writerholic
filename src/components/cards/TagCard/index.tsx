import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ITag } from "@/interfaces/schema"

interface IProps {
    data: ITag;
    onDelete: (id: string) => void;
    onEdit: (val: ITag) => void;
}

export function TagCard({ data, onDelete, onEdit }: IProps) {
  return (
    <Card className="w-[200px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline"  onClick={() => onEdit(data)}>Edit</Button>
        <Button onClick={() => onDelete(data._id!)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}
