import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Blog from '@/models/BlogModel';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string }}) {

    try {
        const body = await req.json()
        const id = params.id
        await dbConnect();

        const session = await apiVerifySession()
        const blog = await Blog.findById(id);

        if (!blog) return NextResponse.json({ message: 'Blog does not exist' }, { status: 404 });

        if (session.userId !== blog?.author.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }
         // Convert `author` and `topic` to ObjectId if they exist in the update payload
        if (body.author && Types.ObjectId.isValid(body.author)) {
            body.author = new Types.ObjectId(body.author);
        }
        if (body.topic && Types.ObjectId.isValid(body.topic)) {
            body.topic = new Types.ObjectId(body.topic);
        }
        

        Object.assign(blog, body)
        const updatedBlog = await blog.save();
        return NextResponse.json(updatedBlog, { status: 200 });
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
        const blog = await Blog.findById(id);
        
        if (!blog) return NextResponse.json({ message: 'Blog does not exist' }, { status: 404 });

        if (session.userId !== blog?.author.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }

        const del = await blog.deleteOne();

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

        const blog = await Blog.findById(id).populate('topic author');

        if (!blog) return NextResponse.json({ message: 'Blog does not exist' }, { status: 404 });

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
