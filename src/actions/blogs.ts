import { StatusEnum } from "@/interfaces";
import dbConnect from "@/lib/dbConnection";
import Blog from "@/models/BlogModel";

export async function getBlogs() {
    const page = 1
    const limit = 20 
    try {
        await dbConnect();
        const total = await Blog.countDocuments({ status: StatusEnum.published })
        const blogs = await Blog.find({
            status: StatusEnum.published,
        }, null, {
            skip: (page-1)*limit,
            limit,
            populate: { path: 'topic author', select: 'title description name profileImage username role' },
            sort: '-createdAt'
        });

        const pages = Math.ceil(total / limit)
        return ({
            page,
            limit,
            total,
            pages,
            hasNextPage: pages > page,
            hasPrevPage: page > 1,
            data: blogs
        });
    } catch (error) {
        console.error({error});
        throw error
    }
}

export async function getFeaturedBlogs() {
    try {
        await dbConnect();
        const blogs = await Blog.find({ isFeatured: true, status: StatusEnum.published }, null, {
            sort: '-featuredAt',
            limit: 3,
            populate: { path: 'topic author', select: 'title description name profileImage username role' }
        });

        return blogs
    } catch (error) {
        console.error({error});
        throw error
    }
}


// export async function getTopics() {
//     noStore();
//     try {
//       const topics = await Topic.find();
//       return topics;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }