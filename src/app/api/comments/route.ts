import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Comment from '@/models/CommentModel';
import { Types } from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {
    try {
        const body = await req.json()

        await dbConnect();

        const requiredFields = ['content', 'name', 'email', 'blog'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }

        if (body.blog && Types.ObjectId.isValid(body.blog)) {
            body.blog = new Types.ObjectId(body.blog);
        }
        // const user = await User.findById(session.userId).lean();

        // if (!user) return NextResponse.json({ message: 'User account not find' }, { status: 403 });

        const comment = await Comment.create(body);
        // ...(user && { user: user._id  })
        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 20) 

    try {
        await dbConnect();
        const total = await Comment.countDocuments()
        const pages = Math.ceil(total / limit)

        const comments = await Comment.find({
            $expr: { $eq: [ "$createdAt" , "$updatedAt" ] } 
        }, null, {
            skip: (page-1)*limit,
            limit,
            populate: { path: 'blog', select: 'title' },
        });

        return NextResponse.json({
            page,
            limit,
            total,
            pages,
            hasNextPage: pages > page,
            hasPrevPage: page > 1,
            data: comments
        }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
