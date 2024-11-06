import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { resolveSearchQuery, validateRequiredFields } from '@/lib/utils';
import Blog from '@/models/BlogModel';
import User from '@/models/UserModel';
import { Types } from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {
    try {
        const body = await req.json()

        await dbConnect();

        const session = await apiVerifySession(RoleEnum.admin)
        // const session = await apiVerifySession(RoleEnum.admin)

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


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 20) 

    const query = search ? {
        $or: [
          { title: resolveSearchQuery({ search }) },
          { excerpt: resolveSearchQuery({ search }) },
        ],
      } : {}
    try {
        await dbConnect();
        const total = await Blog.countDocuments(query)
        const blogs = await Blog.find(query, null, {
            skip: (page-1)*limit,
            limit,
            populate: { path: 'topic author', select: 'title description name profileImage username role' }
        });

        const pages = Math.ceil(total / limit)
        return NextResponse.json({
            page,
            limit,
            total,
            pages,
            hasNextPage: pages > page,
            hasPrevPage: page > 1,
            data: blogs
        }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
