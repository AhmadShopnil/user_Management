import { Request, Response } from 'express';
import { orderService } from './order.services';
import { Order } from './order.interface';

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

const getOrderListById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await orderService.getOrderListByIdFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order List by Id  Beause user not found!!',
    });
  }
};
const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await orderService.getOrderListByIdFromDB(Number(userId));

    if (result !== null && result?.orders?.length !== 0 && result?.orders) {
      let totalCost = 0;
      result.orders?.forEach((item: Order) => {
        totalCost = totalCost + item.price * item.quantity;
      });

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        totalPrice: totalCost,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to get total order cost by Id',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get total order cost by Id  Because user not found!!',
    });
  }
};

export const orderController = {
  createNewOrder,
  getOrderListById,
  getTotalOrderPrice,
};
