import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const SALT_FACTOR = 10;

interface IUser extends Document {
    email: string;
    password: string;
    isAdmin: boolean;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

UserSchema.pre<IUser>('save', function(next) {
    const user = this;
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if(error){
            return next(error);
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if (err){
                return next(err);
            }
            user.password = encrypted;
            next();
        })
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, true)
    });
}

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)
