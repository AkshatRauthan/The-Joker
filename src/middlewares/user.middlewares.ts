import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorResponse } from '@common';
import { AppError } from '@errors';
import { AuthValidators } from '@helpers';

const { validateEmail, validateUsername, validatePassword } = AuthValidators;

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
    };
}

async function verifyAccountOwnership(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
        }
        if (!req.user || req.user.id !== userId) {
            throw new AppError("You do not have permission to access this resource", StatusCodes.FORBIDDEN);
        }
        next();
    } catch (error: any) {
        ErrorResponse.message = "Something went wrong while verifying account ownership";
        ErrorResponse.error = error;
        res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function validateUpdateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!(req.body.email || req.body.username || req.body.password)) 
            throw new AppError("No fields provided for being updated in request", StatusCodes.NO_CONTENT);
        if (req.body.email) validateEmail(req.body.email);
        if (req.body.username) validateUsername(req.body.username);
        if (req.body.password) validatePassword(req.body.password);
        next();
    } catch (error: any) {
        ErrorResponse.message = "Something went wrong while validating your update request";
        ErrorResponse.error = error;
        res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

export default {
    verifyAccountOwnership,
    validateUpdateRequest,
};
