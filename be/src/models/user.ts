import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    ruoli: string;
    permessi: string[];
    password: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    ruoli: { type: String, required: true },
    permessi: { type: [String], default: [] },
    password: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
