import express from 'express';

import { authController } from '@controllers';
import { authMiddlewares } from '@middlewares';

const router = express.Router();


/**
 * @route POST /api/v1/auth/signup
 * @description Register a new user
 * @access Public
 */
router.post(
        '/signup',
        authMiddlewares.validateAuthRequest,
        authController.signup
    );


/**
 * @route POST /api/v1/auth/signin
 * @description Login a user
 * @access Public
 */
router.post(
        '/signin',
        authMiddlewares.validateLoginRequest,
        authController.signin
    );

export default router;
