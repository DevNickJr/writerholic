import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { validateRequiredFields } from '@/lib/utils';
import Tag from '@/models/TagModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {

    try {
        const body = await req.json()
        await dbConnect();
        await apiVerifySession(RoleEnum.admin)

        const requiredFields = ['title'];

        const missingFieldMessage = validateRequiredFields(requiredFields, body);
        if (missingFieldMessage) {
          return NextResponse.json({ message: missingFieldMessage }, { status: 400 });
        }
        const tag = await Tag.create(body);
        return NextResponse.json(tag, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET() {

    try {
        await dbConnect();

        const tags = await Tag.find();

        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
