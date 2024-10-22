import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Comment from '@/models/CommentModel';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string }}) {

    try {
        const body = await req.json()
        const id = params.id
        await dbConnect();

        const session = await apiVerifySession('', false)
        const comment = await Comment.findById(id);

        if (!comment) return NextResponse.json({ message: 'Comment does not exist' }, { status: 404 });

        if (session.userId.toString() !== comment.user?.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }
         // Convert `user` and `topic` to ObjectId if they exist in the update payload
        if (body.user && Types.ObjectId.isValid(body.user)) {
            body.user = new Types.ObjectId(body.user);
        }

        Object.assign(comment, body)

        const updatedComment = await comment.save();
        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const session = await apiVerifySession()
        const comment = await Comment.findById(id);

        if (!comment) return NextResponse.json({ message: 'Comment does not exist' }, { status: 404 });

        if (session.role !== RoleEnum.admin && session.userId !== comment?.user?.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }

        const del = await comment.deleteOne();

        return NextResponse.json(del, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const comment = await Comment.findById(id).populate('user');

        if (!comment) return NextResponse.json({ message: 'Comment does not exist' }, { status: 404 });

        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
