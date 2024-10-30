import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Blog from '@/models/BlogModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
    try {
        const id = params.id

        await dbConnect();

        await apiVerifySession()

        const blog = await Blog.findById(id);

        if (!blog) return NextResponse.json({ message: 'Blog does not exist' }, { status: 404 });

        blog.isFeatured = !!blog.isFeatured
        blog.featuredAt = new Date()

        const updatedBlog = await blog.save();
        return NextResponse.json(updatedBlog, { status: 200 });

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

