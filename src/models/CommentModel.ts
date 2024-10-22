import { models, model, Schema, Model } from 'mongoose';
import { IComment } from '@/interfaces/schema';
import UserModel from './UserModel';

const CommentSchema: Schema<IComment> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel, //Author
    },
    content: {
        type: String,
        required: true,
    },
}, {
  timestamps: true
});

const CommentModel: Model<IComment> = models.Comment || model<IComment>('Comment', CommentSchema);


export default CommentModel