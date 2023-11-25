import { Request, Response } from 'express';
import { orderService } from './order.services';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orderData } = req.body;

    const result = await orderService.createNewOrderInDB(
      Number(userId),
      orderData,
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          'Failed to create new order Beause user not found for create order',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new order',
      error: error,
    });
  }
};

export const orderController = {
  createNewOrder,
};
