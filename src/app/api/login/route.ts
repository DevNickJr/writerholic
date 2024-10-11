import dbConnect from '@/lib/dbConnection';
import { createSession } from '@/lib/session';
import User from '@/models/UserModel';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------
export async function POST(req: Request) {
    const body = await req.json()

    try {
        await dbConnect();
        if (!body.password || (!body.email)) {
            return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
        }

        const user = await User.findOne({ email: body.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }
        const isMatch = await user.comparePassword(body.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        await createSession(user._id.toString(), user.role)


        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
