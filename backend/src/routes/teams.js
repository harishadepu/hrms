import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { listTeams, createTeam, updateTeam, deleteTeam, teamEmployees } from '../controllers/teamController.js';

const router = Router();
router.use(requireAuth);

router.get('/', listTeams);
router.get('/:id/employees', teamEmployees);
router.post('/', requireRole('owner', 'admin'), createTeam);
router.put('/:id', requireRole('owner', 'admin'), updateTeam);
router.delete('/:id', requireRole('owner', 'admin'), deleteTeam);

export default router;