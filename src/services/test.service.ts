import { StatusCodes } from "http-status-codes";

import {AppError} from '@errors';

async function testServer(): Promise<{ serverStatus: string }> {
    try {
        const data = {
            serverStatus: "Yup! The server is working fine"
        };
        return data;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Something went wrong while processing your request.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    testServer,
};
