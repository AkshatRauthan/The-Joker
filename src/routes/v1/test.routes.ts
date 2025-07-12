import express from 'express';
import { testController } from '@controllers';

const router = express.Router();


/**
 * @route GET /api/v1/test
 * @description Test if the server is working
 * @access Public
 */
router.get('/', 
        testController.testServer
);

export default router;
