import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import AppError from '@errors/app-error';
import { StatusCodes } from 'http-status-codes';

import { serverConfig } from '@config';
const { JWT_SECRET, JWT_EXPIRATION } = serverConfig;

async function checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
    try {
        return bcrypt.compareSync(password, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

async function createAuthToken(object: object): Promise<string> {
    try {
        return jwt.sign(object, JWT_SECRET as string, {
            expiresIn: JWT_EXPIRATION || '1d'
        } as SignOptions);
    } catch (error) {
        throw error;
    }
}

async function verifyToken(token: string): Promise<string | JwtPayload> {
    try {
        const response = jwt.verify(token, JWT_SECRET as string);
        console.log(response);
        return response;
    } catch (error: any) {
        if (error.name == 'JsonWebTokenError') throw new AppError('Invalid authentication token', StatusCodes.UNAUTHORIZED);
        if (error.name == 'TokenExpiredError') throw new AppError('Authentication token expired', StatusCodes.UNAUTHORIZED);
        throw new AppError(error.message, error.statusCode);
    }
}

export default {
    checkPassword,
    createAuthToken,
    verifyToken,
};
