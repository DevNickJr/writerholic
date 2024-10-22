import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Comment from '@/models/CommentModel';
import User from '@/models/UserModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {
    try {
        const body = await req.json()

        await dbConnect();

        const session = await apiVerifySession('', false);

        const requiredFields = ['content'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }

        // if (body.topic && Types.ObjectId.isValid(body.topic)) {
        //     body.topic = new Types.ObjectId(body.topic);
        // }
        const user = await User.findById(session.userId).lean();

        // if (!user) return NextResponse.json({ message: 'User account not find' }, { status: 403 });

        const comment = await Comment.create({
            ...body,
            ...(user && { user: user._id  })
        });
        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {

    try {
        await dbConnect();

        const comments = await Comment.find({}).populate({ path: 'user', select: 'name' });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
