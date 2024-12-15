import dbConnect from '@/lib/dbConnection';
import Topic from '@/models/TopicModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

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
