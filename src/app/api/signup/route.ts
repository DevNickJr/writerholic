import dbConnect from '@/lib/dbConnection';
import User from '@/models/UserModel';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(req: Request) {

    try {
        const body = await req.json()
        await dbConnect();
        console.log({ body })

        if (!body.email || !body.password || !body.username || !body.name) {
            return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
            
        }

        if (body.password.length < 6) {
           return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
        }

        if (body.password !== body.confirm_password) {
           return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
        }

        if (body.access_code !== process.env.ACCESS_CODE) {
           return NextResponse.json({ message: 'Invalid access code' }, { status: 400 });
        }

        const userExists = await User.findOne({
            $or: [
                { email: body.email },
                { username: body.username }
            ]
        });

        if (userExists) {
           return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const user = await User.create({
            ...body,
            password: hashedPassword,
        });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}