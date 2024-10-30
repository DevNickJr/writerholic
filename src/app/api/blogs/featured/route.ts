import dbConnect from '@/lib/dbConnection';
import Blog from '@/models/BlogModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find({ isFeatured: true }, null, {
            sort: '-featuredAt',
            limit: 3,
            populate: { path: 'topic author', select: 'title description name profileImage username role' }
        });

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
