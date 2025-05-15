import mongoose, { Model, Schema } from "mongoose";
import { User } from "./User";

interface IPost extends Document {
    title: string;
    text: string;
    likes: number;
    date: Date;
    creator: typeof User;
}

const PostSchema: Schema<IPost> = new mongoose.Schema({
    title: { type: String, required: true},
    text: { type: String, required: true },
    likes: { type: Number, required: true },
    date: { type: Date, required: true },
    creator: { type: User, required: true }
});


export const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema)