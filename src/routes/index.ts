import express from 'express';
import v1Routes from '@v1routes';

const router = express.Router();

/**
 * API version routes
 */
router.use('/v1', v1Routes);

export default router;
