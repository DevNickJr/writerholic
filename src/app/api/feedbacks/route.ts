import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Feedback from '@/models/FeedbackModel';
import { type NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {
    try {
        const body = await req.json()

        await dbConnect();

        const requiredFields = ['name', 'email', 'message'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }

        const feedback = await Feedback.create(body);
        return NextResponse.json(feedback, { status: 200 });
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
        const total = await Feedback.countDocuments()
        const pages = Math.ceil(total / limit)

        const feedbacks = await Feedback.find({}, null, {
            skip: (page-1)*limit,
            limit,
        });

        return NextResponse.json({
            page,
            limit,
            total,
            pages,
            hasNextPage: pages > page,
            hasPrevPage: page > 1,
            data: feedbacks
        }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
