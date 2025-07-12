import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface IAuthenticateUserRequest {
    username: string;
    password: string;
}

export interface IAuthResponse {
    user: IUser;
    token: string;
}

export interface ISuccessResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: {};
}

export interface IErrorResponse {
    success: boolean;
    message: string;
    data?: {};
    error?: any;
}
