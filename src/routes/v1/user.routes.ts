import express from 'express';
import { userController } from '@controllers';
import { authMiddlewares, userMiddlewares } from '@middlewares';

const router = express.Router();


/**
 *  @route GET /api/v1/users
 *  @description Get all users
 *  @access Public
*/  
router.get(
        '/',
        userController.getAllUsers
    );


/**
 *  @route GET /api/v1/users/:id
 *  @description Get used by ID
 *  @access Private (Account owner only)
*/ 
router.get(
        '/:id',
        authMiddlewares.validateAuthToken,
        userMiddlewares.verifyAccountOwnership,
        userController.getUser
    );


/**
 *  @route POST /api/v1/users/:id
 *  @description Update user by ID
 *  @access Private (Account owner only)
*/ 
router.post(
        '/:id',
        authMiddlewares.validateAuthToken,
        userMiddlewares.verifyAccountOwnership,
        userMiddlewares.validateUpdateRequest,
        userController.updateUser
    );


/**
 *  @route DELETE /api/v1/users/:id
 *  @description Delete user by ID
 *  @access Private (Account owner only)
*/ 
router.delete(
        '/:id',
        authMiddlewares.validateAuthToken,
        userMiddlewares.verifyAccountOwnership,
        userController.deleteUser
    );

export default router;