import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '@repositories';
import { serverConfig } from '@config';
import {AppError} from '@errors';
import { IUser } from '@types';

const { SALT_ROUNDS } = serverConfig;
const userRepository = new UserRepository();

/**
 * Get a user by ID
 * @param id - User ID
 * @returns User
 */
async function getUser(id: string): Promise<Partial<IUser>> {
    try {
        const user = await userRepository.get(id);
        
        // Don't return the password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        return userResponse;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while fetching the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Get all users
 * @returns Array of users
 */
async function getAllUsers(): Promise<Partial<IUser>[]> {
    try {
        const users = await userRepository.getAll();
        
        // Don't return passwords
        const usersResponse = users.map(user => {
            const userObj = user.toObject();
            delete userObj.password;
            return userObj;
        });
        
        return usersResponse;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while fetching the users', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Update a user
 * @param id - User ID
 * @param data - Data to update
 * @returns Updated user
 */
async function updateUser(id: string, data: Partial<IUser>): Promise<Partial<IUser>> {
    try {
        if (data.password) {
            const saltRounds = Number(SALT_ROUNDS);
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        if (data.email) {
            const existingUser = await userRepository.findByEmail(data.email);
            if (existingUser && (existingUser as any)._id.toString() !== id) {
                throw new AppError('Email already in use', StatusCodes.CONFLICT);
            }
        }
        if (data.username) {
            const existingUser = await userRepository.findByUsername(data.username);
            if (existingUser && (existingUser as any)._id.toString() !== id) {
                throw new AppError('Username already taken', StatusCodes.CONFLICT);
            }
        }
        const updatedUser = await userRepository.update(id, data);

        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        return userResponse;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while updating the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Delete a user
 * @param id - User ID
 * @returns Deleted user
 */
async function deleteUser(id: string): Promise<Partial<IUser>> {
    try {
        const deletedUser = await userRepository.destroy(id);
        
        // Don't return the password
        const userResponse = deletedUser.toObject();
        delete userResponse.password;
        
        return userResponse;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while deleting the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
