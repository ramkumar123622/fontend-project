import express from 'express';
import { createOrder, getOrder, getOrders } from '../controllers/orderController.js';
import { checkUser } from '../middlewares/checkUser.js';
import { notAllowed } from '../utils/notAllowed.js';






const router = express.Router();

router.route('/api/orders').get( checkUser, getOrders).post(checkUser, createOrder).all(notAllowed);
router.route('/api/orders/:id').get(getOrder).all(notAllowed);


export default router;