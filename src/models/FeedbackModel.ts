import { models, model, Schema, Model } from 'mongoose';
import { IFeedback } from '@/interfaces/schema';

const FeedbackSchema: Schema<IFeedback> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
  timestamps: true
});

const FeedbackModel: Model<IFeedback> = models.Feedback || model<IFeedback>('Feedback', FeedbackSchema);


export default FeedbackModel