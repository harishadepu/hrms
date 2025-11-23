import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { listEmployees, createEmployee, updateEmployee, deleteEmployee, assignEmployee, unassignEmployee } from '../controllers/employeeController.js';

const router = Router();
router.use(requireAuth);

router.get('/', listEmployees);
router.post('/', requireRole('owner', 'admin'), createEmployee);
router.put('/:id', requireRole('owner', 'admin'), updateEmployee);
router.delete('/:id', requireRole('owner', 'admin'), deleteEmployee);

router.post('/assign/:teamId', requireRole('owner', 'admin'), assignEmployee);
router.delete('/assign/:teamId/:employeeId', requireRole('owner', 'admin'), unassignEmployee);

export default router;