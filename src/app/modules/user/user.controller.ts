import { Request, Response } from 'express';
import { userService } from './user.services';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // zod validation
    const zodParseData = userValidationSchema.parse(userData);

    // call service for create user in database
    const result = await userService.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User  successfully created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new users',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.geAllUserFromDB();
    if (result.length !== 0) {
      res.status(200).json({
        success: true,
        message: 'User  fetched  SuccessFully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to get all users',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get all users',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.geSingleUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User  fetched  success',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { updateData } = req.body;
    const { userId } = req.params;
    const result = await userService.updateSingleUSerInDB(
      Number(userId),
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'User  successfully Updated',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User update faild',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteSingleUSerInDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User Delete faild',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

/// oder Controllers
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orderData } = req.body;

    const result = await userService.createNewOrderInDB(
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
    const result = await userService.getOrderListByIdFromDB(Number(userId));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to get  order list',
        error: {
          code: 404,
          description:
            'Failed to get order list by Id  Because user not found!!',
        },
      });
    }
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

const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getTotalOrderPrice(Number(userId));

    if (typeof result === 'number') {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: result,
        },
      });
    } else if (typeof result === 'string') {
      res.status(500).json({
        success: false,
        message: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to get total order cost',
        error: {
          code: 404,
          description:
            'Failed to get total order cost by Id  Because user not found!!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get total order cost by Id  Because user not found!!',
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createNewOrder,
  getTotalOrderPrice,
  getOrderListById,
};
