import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

import { userService } from "@services";
import { ErrorResponse, SuccessResponse } from "@common";

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
    };
}

/*
GET : api/v1/users/:id
    req.params: {
        id: "6858fdcb42a36e86218dd9de"
    }
    req.user: {
        id: "6858fdcb42a36e86218dd9de",
        username: "alan123",
        email: "alan123@gmail.com"
    }
*/
async function getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const response = await userService.getUser(userId);
        
        SuccessResponse.data = response;
        SuccessResponse.message = 'User retrieved successfully';
        res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/*
GET : api/v1/users
    req.user: {
        id: "6858fdcb42a36e86218dd9de",
        username: "alan123",
        email: "alan123@gmail.com"
    }
*/
async function getAllUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const response = await userService.getAllUsers();
        
        SuccessResponse.data = response;
        SuccessResponse.message = 'Users retrieved successfully';
        res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/*
PUT : api/v1/users/:id
    req.params: {
        id: "6858fdcb42a36e86218dd9de"
    }
    req.body: {
        username: "newusername",
        email: "newemail@gmail.com"
    }
    req.user: {
        id: "6858fdcb42a36e86218dd9de",
        username: "alan123",
        email: "alan123@gmail.com"
    }
*/
async function updateUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const response = await userService.updateUser(userId, req.body);
        
        SuccessResponse.data = response;
        SuccessResponse.message = 'User updated successfully';
        res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/*
DELETE : api/v1/users/:id
    req.params: {
        id: "6858fdcb42a36e86218dd9de"
    }
    req.user: {
        id: "6858fdcb42a36e86218dd9de",
        username: "alan123",
        email: "alan123@gmail.com"
    }
*/
async function deleteUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const response = await userService.deleteUser(userId);
        SuccessResponse.data = response;
        SuccessResponse.message = 'User deleted successfully';
        res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

export default {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
