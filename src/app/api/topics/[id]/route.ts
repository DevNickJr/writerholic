import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import Topic from '@/models/TopicModel';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string }}) {

    try {
        const body = await req.json()
        const id = params.id
        await dbConnect();

        await apiVerifySession(RoleEnum.admin)

        const topic = await Topic.findById(id);

        if (!topic) {
            return NextResponse.json({ message: 'Topic does not exist' }, { status: 401 });
        }

        Object.assign(topic, body)

        const updatedtopic = await topic.save();
        return NextResponse.json(updatedtopic, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: { id: string }}) {

    try {
        const id = params.id
        await dbConnect();

        const topic = await Topic.findById(id);

        return NextResponse.json(topic, { status: 200 });
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

        const topic = await Topic.findById(id);
        if (!topic) {
            return NextResponse.json({ message: 'Topic does not exist' }, { status: 401 });
        }

        const del = await topic.deleteOne();

        return NextResponse.json(del, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

