import { models, model, Schema, Model } from 'mongoose';
import { ITopic } from '@/interfaces/schema';

const TopicSchema: Schema<ITopic> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
}, {
  timestamps: true
});

const TopicModel: Model<ITopic> = models.Topic || model<ITopic>('Topic', TopicSchema);


export default TopicModel