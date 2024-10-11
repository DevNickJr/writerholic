import { models, model, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@/interfaces/schema';
import { RoleEnum } from '@/interfaces';

const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        maxlength: 500
    },
    profileImage: {
        type: String, // URL or path to the user's profile image
        default: 'path_to_default_image.jpg'
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum), // User roles
        default: RoleEnum.reader,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Users following this user
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Users this user is following
    }],
    resetPasswordToken: String,  // For password recovery
    resetPasswordExpires: Date,  // Expiry for password reset token
}, {
  timestamps: true
});

//compare password
UserSchema.methods.comparePassword = async function comparePassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const UserModel: Model<IUser> = models.User || model<IUser>('User', UserSchema);


export default UserModel