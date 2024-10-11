import { verifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Blog from '@/models/BlogModel';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string }}) {

    try {
        const body = await req.json()
        const id = params.id
        await dbConnect();

        const session = await verifySession()
        const blog = await Blog.findById(id);
        if (session.userId !== blog?.author.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }

        Object.assign(blog, body)

        const updatedBlog = await blog.save();
        return NextResponse.json({ blog: updatedBlog }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const session = await verifySession()
        const blog = await Blog.findById(id);

        if (session.userId !== blog?.author.toString()) {
            return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 });
        }

        const del = await blog.deleteOne();

        return NextResponse.json({ blog: del }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const blog = await Blog.findById(id);

        return NextResponse.json({ blog }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
