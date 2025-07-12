import { AppError } from "@errors/index";
import { StatusCodes } from "http-status-codes";

async function validateUsername(username: string): Promise<boolean> {
    if (typeof username !== 'string') 
        throw new AppError("Username must be a string", StatusCodes.BAD_REQUEST);
    if (username.length < 3 || username.length > 20) 
        throw new AppError("Username must be between 3 and 20 characters long", StatusCodes.BAD_REQUEST);
    if (!/^[a-zA-Z0-9_]+$/.test(username)) 
        throw new AppError("Username can only contain letters, numbers, and underscores", StatusCodes.BAD_REQUEST);
    return true;
}

async function validateEmail(email: string): Promise<boolean> {
    if (typeof email !== 'string') throw new AppError("Email must be a string", StatusCodes.BAD_REQUEST);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new AppError("Invalid email format", StatusCodes.BAD_REQUEST);
    return true;
}

async function validatePassword(password: string): Promise<boolean> {
    if (typeof password !== 'string') throw new AppError("Password must be a string", StatusCodes.BAD_REQUEST);
    if (password.length < 8) throw new AppError("Password must be at least 8 characters long", StatusCodes.BAD_REQUEST);
    if (!/[A-Z]/.test(password)) throw new AppError("Password must include at least one uppercase letter", StatusCodes.BAD_REQUEST);
    if (!/[a-z]/.test(password)) throw new AppError("Password must include at least one lowercase letter", StatusCodes.BAD_REQUEST);
    if (!/[0-9]/.test(password)) throw new AppError("Password must include at least one number", StatusCodes.BAD_REQUEST);
    if (!/[`~!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]/.test(password)) 
        throw new AppError("Password must include at least one special character", StatusCodes.BAD_REQUEST);
    return true;
}

export default {
    validateUsername,
    validateEmail,
    validatePassword,
};
