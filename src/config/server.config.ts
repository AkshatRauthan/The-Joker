import dotenv from 'dotenv';
dotenv.config();

interface ServerConfig {
    PORT: string | undefined;
    MONGODB_URL: string | undefined;
    DB_NAME: string | undefined;
    CORS_ORIGIN: string | undefined;
    SALT_ROUNDS: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_EXPIRATION: string | undefined;
}

const serverConfig: ServerConfig = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    DB_NAME: process.env.DB_NAME,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
};

export default serverConfig;
