import { Types } from "mongoose";
import { RoleEnum, StatusEnum } from ".";



export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    name: string;
    bio?: string;
    profileImage?: string;
    role: RoleEnum;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface IBlog {
    _id?: string;
    title: string;
    content: string;
    slug: string;
    author: Types.ObjectId | string;
    featuredImage: string;
    excerpt: string;
    status: StatusEnum;
    readingTime?: string;
    views: string;
    topic: string;
    isFeatured: boolean;
    likes?: number;
    tags?: string[]; 
}

export interface ITopic {
    _id?: string;
    title: string;
    description: string;
}

export interface ITag {
    _id?: string;
    title: string;
}

export interface IComment {
    _id?: string;
    title: string;
    content: string;
    slug: string;
    author: Types.ObjectId;
    featuredImage: string;
    excerpt: string;
    status: StatusEnum;
    readingTime: string;
    views: string;
    topic: string;
    tags: Types.ObjectId[];

}
