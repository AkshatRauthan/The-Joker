import express from 'express';

import testRoutes from '@v1routes/test.routes';
import userRoutes from '@v1routes/user.routes';
import authRoutes from '@v1routes/auth.routes';
import jokesRoutes from '@v1routes/jokes.routes';

const router = express.Router();

/**
 * All API v1 routes
 */
router.use('/test', testRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/jokes', jokesRoutes);

export default router;
