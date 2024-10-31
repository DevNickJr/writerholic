import dbConnect from '@/lib/dbConnection';
import Comment from '@/models/CommentModel';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    const searchParams = req.nextUrl.searchParams
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 20) 

    try {
        const id = params.id
        await dbConnect();
        // const total = await Comment.countDocuments()
        // const pages = Math.ceil(total / limit)

        const comments = await Comment.find({ blog: new Types.ObjectId(id), approved: true }, null, {
            skip: (page-1)*limit,
            limit,
            sort: '-createdAt'
        });

        if (!comments) return NextResponse.json({ message: 'Comment does not exist' }, { status: 404 });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
