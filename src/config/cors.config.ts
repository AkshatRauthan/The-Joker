import { CorsOptions } from 'cors';

/**
 * CORS configuration
 * Controls cross-origin resource sharing settings
 */

const corsConfig: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
};

export default corsConfig;
