import { deleteSession } from '@/lib/session';
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------
export async function POST() {

    try {
         deleteSession()

        return NextResponse.json({
            success: true,
            message: 'Session ended sucessfully'
        }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
