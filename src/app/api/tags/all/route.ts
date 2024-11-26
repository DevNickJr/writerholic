import dbConnect from '@/lib/dbConnection';
import Tag from '@/models/TagModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function GET() {

    try {
        await dbConnect();

        const tags = await Tag.find({});

        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
