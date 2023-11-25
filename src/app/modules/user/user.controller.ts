import { Request, Response } from 'express';
import { userService } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

    const result = await userService.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User  successfully created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new user',
      error: error,
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
      message: 'Failed to get all user',
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.geSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User  fetched  created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user data',
      error: error,
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
      message: 'User update failed',
      error: error,
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
      message: 'User deleted failed',
      error: error,
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
