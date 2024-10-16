import { models, model, Schema, Model } from 'mongoose';
import { IComment } from '@/interfaces/schema';
import { StatusEnum } from '@/interfaces';
import UserModel from './UserModel';
import TagModel from './TagModel';

const CommentSchema: Schema<IComment> = new Schema({
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
        ref: UserModel, //Author
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
    status: {
        type: String,
        enum: Object.values(StatusEnum), // User roles
        default: StatusEnum.published,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: TagModel // Users following this user
    }],
}, {
  timestamps: true
});

const CommentModel: Model<IComment> = models.Comment || model<IComment>('Comment', CommentSchema);


export default CommentModel