import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Blog from '@/models/BlogModel';
import User from '@/models/UserModel';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {
    try {
        const body = await req.json()

        await dbConnect();

        const session = await apiVerifySession(RoleEnum.admin)

        const requiredFields = ['title', 'content', 'excerpt', 'topic', 'featuredImage'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }

        if (body.topic && Types.ObjectId.isValid(body.topic)) {
            body.topic = new Types.ObjectId(body.topic);
        }

        const author = await User.findById(session.userId).lean();

        if (!author) return NextResponse.json({ message: 'Author account not find' }, { status: 403 });

        const blog = await Blog.create({
            ...body,
            author: author._id
        });
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {

    try {
        await dbConnect();

        const blogs = await Blog.find({}).populate({ path: 'topic author', select: 'title description name profileImage username role ' });

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
