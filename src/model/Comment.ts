import mongoose, { Model, Schema } from "mongoose";
import { User } from "./User";

interface IComment extends Document {
    text: string,
    likes: number,
    creator: typeof User,
}

const CommentSchema: Schema<IComment> = new mongoose.Schema({
    text: { type: String, required: true },
    likes: { type: Number, required: true },
    creator: { type: User, required: true }
});


export const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema)