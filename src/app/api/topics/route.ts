import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Topic from '@/models/TopicModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {

    try {
        const body = await req.json()
        await dbConnect();
        await apiVerifySession(RoleEnum.admin)

        const requiredFields = ['title', 'description'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }
        const topic = await Topic.create(body);
        return NextResponse.json(topic, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {

    try {
        await dbConnect();

        const topics = await Topic.find();

        return NextResponse.json(topics, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}