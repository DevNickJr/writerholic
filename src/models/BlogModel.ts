import { models, model, Schema, Model } from 'mongoose';
import { IBlog } from '@/interfaces/schema';
import { StatusEnum } from '@/interfaces';

const BlogSchema: Schema<IBlog> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', //Author
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    readingTime: {
        type: String,
    },
    views: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: Object.values(StatusEnum), // User roles
        default: StatusEnum.published,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag' // Users following this user
    }],
}, {
  timestamps: true
});

const BlogModel: Model<IBlog> = models.Blog || model<IBlog>('Blog', BlogSchema);


export default BlogModel