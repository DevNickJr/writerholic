import * as React from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { IFeedback } from "@/interfaces/schema"

interface IProps {
    data: IFeedback;
}

export function FeedbackCard({ data }: IProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.email}</CardDescription>
      </CardHeader>
      <CardContent>
          <p>
            {data.message}
          </p>
      </CardContent>
        {/* <Button onClick={() => action(true)}>Approve</Button>
        <Button onClick={() => action(false)} variant="outline">Disapprove</Button> */}
    </Card>
  )
}
