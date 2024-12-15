import dbConnect from '@/lib/dbConnection';
import User from '@/models/UserModel';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

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
        const isMatch = await user.comparePassword(body.old_password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid Old Credentials' }, { status: 400 });
        }

        if (body.password !== body.confirm_password) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
        }
 
        //hash password
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(body.password, salt);
        user.password = hashedPassword

        await user.save()

        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
