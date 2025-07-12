import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { SuccessResponse, ErrorResponse } from "@common";
import { authService } from "@services";

/*
POST : api/v1/auth/signup
    req.body : {
        email: "alan123@gmail.com",
        password: "1234Alan$#",
        username: "alan123"
    }
*/
async function signup(req: Request, res: Response): Promise<void> {
    try {
        const { username, email, password } = req.body;
        const user = await authService.createUser({ username, email, password });
        SuccessResponse.data = user;
        SuccessResponse.message = "User registered successfully";
        res
            .status(StatusCodes.CREATED)
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
POST : api/v1/auth/signin
    req.body : {
        username: "alan123"
        password: "1234Alan$#",
    }
*/
async function signin(req: Request, res: Response): Promise<void> {
    try {
        const response = await authService.authenticateUser({
            username: req.body.username,
            password: req.body.password,
        });
        SuccessResponse.data = response;
        console.log(response);
        SuccessResponse.message = 'User authenticated successfully';
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
    signin,
    signup,
};
