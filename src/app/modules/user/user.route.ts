import express from 'express';
import { userController } from './user.controller';
import { orderController } from '../order/order.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);

// Routes for orders

// router.get('/:userId/orders/total-price', orderController.getTotalOrderPrice);
router.get('/:userId/orders', orderController.getOrderListById);
router.put('/:userId/orders', orderController.createNewOrder);

export const UserRoutes = router;
