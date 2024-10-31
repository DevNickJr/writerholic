import dbConnect from "@/lib/dbConnection";
import Blog from "@/models/BlogModel";

export async function getBlogs() {
    const page = 1
    const limit = 20 
    try {
        await dbConnect();
        const total = await Blog.countDocuments()
        const blogs = await Blog.find({}, null, {
            skip: (page-1)*limit,
            limit,
            populate: { path: 'topic author', select: 'title description name profileImage username role' }
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