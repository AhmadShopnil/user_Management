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
      message: 'Something  wrong please try again',
      error: error,
    });
  }
};

export const userController = {
  createUser,
};
