import { Request, Response } from 'express';
import { userService } from './user.services';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

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
    res.status(200).json({
      success: true,
      message: 'User  fetched  created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get all users',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.geSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User  fetched  success',
      data: result,
    });
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
