import { models, model, Schema, Model } from 'mongoose';
import { ITag } from '@/interfaces/schema';

const TagSchema: Schema<ITag> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
}, {
  timestamps: true
});

const TagModel: Model<ITag> = models.Tag || model<ITag>('Tag', TagSchema);


export default TagModel