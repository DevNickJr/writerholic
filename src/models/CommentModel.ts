import { models, model, Schema, Model } from 'mongoose';
import { IComment } from '@/interfaces/schema';
import UserModel from './UserModel';
import BlogModel from './BlogModel';

const CommentSchema: Schema<IComment> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel, //Author
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: BlogModel, //Author
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    website: {
        type: String,
    },
}, {
  timestamps: true
});

const CommentModel: Model<IComment> = models.Comment || model<IComment>('Comment', CommentSchema);


export default CommentModel