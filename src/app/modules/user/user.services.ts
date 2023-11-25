import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const geAllUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};
const geSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne(
    { userId },
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      isActive: 1,
      hobbies: 1,
    },
  );
  return result;
};

const updateSingleUSerInDB = async (userId: number, updateData: object) => {
  const result = await UserModel.updateOne({ userId }, { $set: updateData });
  return result;
};
const deleteSingleUSerInDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};
export const userService = {
  createUserIntoDB,
  geAllUserFromDB,
  geSingleUserFromDB,
  updateSingleUSerInDB,
  deleteSingleUSerInDB,
};
