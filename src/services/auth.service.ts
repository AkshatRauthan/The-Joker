import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '@repositories';
import { AppError } from '@errors';
import { ICreateUserRequest, IAuthenticateUserRequest, IAuthResponse } from '@types';
import { AuthFunctions } from '@helpers';

const userRepository = new UserRepository();

async function createUser(data: ICreateUserRequest): Promise<{ email: string; username: string }> {
    try {
        const existingUserByEmail = await userRepository.findByEmail(data.email);
        if (existingUserByEmail) {
            throw new AppError('Email already in use', StatusCodes.CONFLICT);
        }
        const existingUserByUsername = await userRepository.findByUsername(data.username);
        if (existingUserByUsername) {
            throw new AppError('Username already taken', StatusCodes.CONFLICT);
        }
        
        const newUser = await userRepository.create(data);
        const userResponse = {
            email: newUser.email,
            username: newUser.username,
        };
        return userResponse;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while authenticating user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function authenticateUser(data: IAuthenticateUserRequest): Promise<IAuthResponse> {
    try {
        const user = await userRepository.findByUsername(data.username);
        if (!user) {
            throw new AppError('Invalid login credentials entered', StatusCodes.UNAUTHORIZED);
        }
        const passwordMatch = await AuthFunctions.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError('Invalid login credentials entered', StatusCodes.UNAUTHORIZED);
        }
        const authToken = await AuthFunctions.createAuthToken({id: user._id, email: user.email, username: user.username});
        const response: IAuthResponse = {
            user: {
                email: user.email,
                username: user.username,
            } as any,
            token: authToken,
        };
        return response;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while authenticating user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createUser,
    authenticateUser,
};
