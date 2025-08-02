import { Router } from 'express';
import { getUsers, createUser } from '../../controllers/auth/userController';
import { validateUser } from '../../validators/auth/userValidator';

const router = Router();

router.get('/', getUsers);
router.post('/register', validateUser, createUser);

export default router;