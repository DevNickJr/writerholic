import dbConnect from '@/lib/dbConnection';
import Comment from '@/models/CommentModel';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const comments = await Comment.find({ blog: new Types.ObjectId(id) }).sort('-createdAt');

        if (!comments) return NextResponse.json({ message: 'Comment does not exist' }, { status: 404 });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
