import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);
router.get('/', userController.getAllUsers);

// Routes for orders

router.get('/:userId/orders/total-price', userController.getTotalOrderPrice);
router.get('/:userId/orders', userController.getOrderListById);
router.put('/:userId/orders', userController.createNewOrder);

export const UserRoutes = router;
