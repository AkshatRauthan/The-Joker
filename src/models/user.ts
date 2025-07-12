import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { IUser } from 'types';

import { serverConfig } from '@config';
const { SALT_ROUNDS } = serverConfig;

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v: string) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    const encryptedPassword = bcrypt.hashSync(this.password, Number(SALT_ROUNDS));
    this.password = encryptedPassword;
    next();
});

export default mongoose.model<IUser>('User', userSchema);
