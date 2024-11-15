import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { resolveSearchQuery, validateRequiredFields } from '@/lib/utils';
import Tag from '@/models/TagModel';
import { NextRequest, NextResponse } from 'next/server';

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


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') ?? ''

    const query = search ? { title: resolveSearchQuery({ search })} : {}

    try {
        await dbConnect();

        const tags = await Tag.find(query);

        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
