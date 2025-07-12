import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@errors';
import { ErrorResponse } from '@common';
import { AuthFunctions, AuthValidators } from '@helpers';

const  { validateEmail, validatePassword, validateUsername} = AuthValidators;

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
    };
}

async function validateAuthRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.body);
        if (!req.body) throw new AppError("Request body is empty", StatusCodes.BAD_REQUEST);
        if (!req.body.email || !req.body.password || !req.body.username) {
            let explanation = [];
            if (!req.body.email) explanation.push('Email is not present in the request body');
            if (!req.body.username) explanation.push('Username is not present in the request body');
            if (!req.body.password) explanation.push('Password is not present in the request body');
            throw new AppError(explanation[0], StatusCodes.BAD_REQUEST);
        }
        validateEmail(req.body.email);
        validateUsername(req.body.username);
        validatePassword(req.body.password);
        next();
    } catch (error: any) {
        ErrorResponse.message = "Something went wrong while validating your request";
        ErrorResponse.error = error;
        res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function validateLoginRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            let explanation = [];
            if (!req.body.username) explanation.push('Username is not present in the request body');
            if (!req.body.password) explanation.push('Password is not present in the request body');
            throw new AppError(explanation.join('. '), StatusCodes.BAD_REQUEST);
        }
        validateUsername(req.body.username);
        validatePassword(req.body.password);
        next();
    } catch (error: any) {
        ErrorResponse.message = "Something went wrong while validating your request";
        ErrorResponse.error = error;
        res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function validateAuthToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.headers["x-access-token"]) throw new AppError("Auth token is absent in the request", StatusCodes.UNAUTHORIZED);
        const authToken = req.headers["x-access-token"] as string;
        const response = await AuthFunctions.verifyToken(authToken);
        if (!response || typeof response === 'string' || !response.email || !response.id || !response.username)
            throw new AppError("Invalid auth token provided", StatusCodes.UNAUTHORIZED);
        req.user = {
            id: response.id,
            username: response.username,
            email: response.email,
        };
        next();
    } catch (error: any) {
        ErrorResponse.message = "Something went wrong while validating your auth token";
        ErrorResponse.error = error;
        res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

export default {
    validateAuthRequest,
    validateLoginRequest,
    validateAuthToken,
};