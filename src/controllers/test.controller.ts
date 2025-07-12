import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

import { ErrorResponse, SuccessResponse } from "@common";
import { testService } from "@services";

async function testServer(req: Request, res: Response): Promise<void> {
    try {
        const response = await testService.testServer();
        SuccessResponse.data = response;
        res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

export default {
    testServer,
};
