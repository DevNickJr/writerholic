import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Blog from '@/models/BlogModel';
import User from '@/models/UserModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {

    try {
        const body = await req.json()
        await dbConnect();

        const requiredFields = ['title', 'content', 'content', 'name', 'topic', 'featuredImage'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }

        const author = await User.findById(body.author).lean();
        if (!author) return NextResponse.json({ message: 'Author account not find' }, { status: 403 });

        const blog = await Blog.create({
            ...body,
            author: author._id
        });
        return NextResponse.json({ blog }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {

    try {
        await dbConnect();

        const blog = await Blog.find();

        return NextResponse.json({ blog }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
