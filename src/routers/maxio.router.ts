import { Router } from 'express';
import { createCustomer } from '../controllers/maxio.controller';

const router = Router();

router.post('/create-customer', createCustomer);

export default router;
