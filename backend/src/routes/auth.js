import { Router } from 'express';
import { login, logout, registerOrg } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/register-organization', registerOrg);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
export default router;