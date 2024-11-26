import { RoleEnum } from '@/interfaces';
import { apiVerifySession } from '@/lib/dal';
import dbConnect from '@/lib/dbConnection';
import { resolveSearchQuery } from '@/lib/utils';
import Blog from '@/models/BlogModel';
import { type NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function GET(request: NextRequest) {
    
    await apiVerifySession(RoleEnum.admin)

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 20) 

    const query = search ? {
        $or: [
          { title: resolveSearchQuery({ search }) },
          { excerpt: resolveSearchQuery({ search }) },
        ],
      } : {}
    try {
        await dbConnect();
        const total = await Blog.countDocuments(query)
        const blogs = await Blog.find(query, null, {
            skip: (page-1)*limit,
            limit,
            populate: { path: 'topic author', select: 'title description name profileImage username role' },
            sort: '-createdAt',
        });

        const pages = Math.ceil(total / limit)
        return NextResponse.json({
            page,
            limit,
            total,
            pages,
            hasNextPage: pages > page,
            hasPrevPage: page > 1,
            data: blogs
        }, { status: 200 });
    } catch (error) {
        console.error({error});
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
