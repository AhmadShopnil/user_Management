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
        message: 'Failed to create new order',
        error: {
          code: 404,
          description: 'Failed to create new order',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new user',
      error: {
        code: 404,
        description: 'Failed to create new user',
      },
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
      message: 'Failed to get  order list',
      error: {
        code: 404,
        description: 'Failed to get order list by Id  Because user not found!!',
      },
    });
  }
};

// const getTotalOrderPrice = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const result = await orderService.getTotalOrderPrice(Number(userId));
//     console.log(result);
//     if (typeof result === 'number') {
//       res.status(200).json({
//         success: true,
//         message: 'Total price calculated successfully!',
//         data: {
//           totalPrice: result,
//         },
//       });
//     } else if (typeof result === 'string') {
//       res.status(500).json({
//         success: false,
//         message: result,
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Failed to get total order cost',
//         error: {
//           code: 404,
//           description: 'Failed to get total order cost by Id  Because user not found!!',,
//         },
//       });
//     }

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get total order cost by Id  Because user not found!!',
//     });
//   }
// };

export const orderController = {
  createNewOrder,
  getOrderListById,
  // getTotalOrderPrice,
};
