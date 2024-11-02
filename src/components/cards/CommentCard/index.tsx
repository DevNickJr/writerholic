import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { IComment, IBlog } from "@/interfaces/schema"

interface IProps {
    data: IComment;
    action: (verdict: boolean) => void;
}

export function CommentCard({ data, action }: IProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Blog: {(data.blog as IBlog)?.title}</CardTitle>
        {/* <CardDescription>{}</CardDescription> */}
      </CardHeader>
      <CardContent>
          <p>
            {data.content}
          </p>

          <div className="flex flex-col mt-4 text-xs md:text-sm italic">
            <span>{data.name}</span>
            <span>{data.email}</span>

          </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-6">
        <Button onClick={() => action(true)}>Approve</Button>
        <Button onClick={() => action(false)} variant="outline">Disapprove</Button>
      </CardFooter>
    </Card>
  )
}
