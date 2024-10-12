import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Tag from '@/models/TagModel';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string }}) {

    try {
        const body = await req.json()
        const id = params.id
        await dbConnect();

        await apiVerifySession(RoleEnum.admin)

        const tag = await Tag.findById(id);

        if (!tag) {
            return NextResponse.json({ message: 'Tag does not exist' }, { status: 401 });
        }

        Object.assign(tag, body)

        const updatedTag = await tag.save();
        return NextResponse.json(updatedTag, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const tag = await Tag.findById(id);

        return NextResponse.json(tag, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        await apiVerifySession(RoleEnum.admin)

        const tag = await Tag.findById(id);
        if (!tag) {
            return NextResponse.json({ message: 'Tag does not exist' }, { status: 401 });
        }

        const del = await tag.deleteOne();

        return NextResponse.json(del, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

