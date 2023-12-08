/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TOrder, TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  // check is user already exist or not
  const userExists = await UserModel.isUserExists(user.userId);

  if (userExists) {
    throw new Error('User Already Exists!');
  }

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
      isActive: 1,
      hobbies: 1,
      orders: 1,
    },
  );
  return result;
};
const geSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      isActive: 1,
      hobbies: 1,
      orders: 1,
    },
  );
  return result;
};

const updateSingleUSerInDB = async (userId: number, updateData: object) => {
  const userExists = await UserModel.isUserExists(userId);

  if (userExists) {
    // const result = await UserModel.updateOne({ userId }, { $set: updateData });

    const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
    return result;
  } else {
    throw new Error('Do not found any user by this id to Update');
  }
};
const deleteSingleUSerInDB = async (userId: number) => {
  // check is user Really exist or not
  const userExists = await UserModel.isUserExists(userId);

  if (userExists) {
    const result = await UserModel.deleteOne({ userId });
    return result;
  } else {
    throw new Error('Do not found any user by this id to delete');
  }
};

/// Order management section
const createNewOrderInDB = async (userId: number, orderData: TOrder) => {
  const user = await UserModel.findOne({ userId });

  // checking is user exist or not
  if (user?.userId) {
    // if already a order found for user
    if (user.orders && Array.isArray(user.orders)) {
      // Append the new order to the existing 'orders' array
      user.orders.push(orderData);

      const result = await UserModel.updateOne({ userId }, { $set: user });
      return result;
    }
    //if first order for user
    else {
      user.orders = [orderData];
      const result = await UserModel.updateOne({ userId }, { $set: user });
      return result;
    }
  } else {
    return user;
  }
};

const getOrderListByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne(
    { userId },
    {
      orders: 1,
    },
  );
  return result;
};

// calculating total price
const getTotalOrderPrice = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  // calculate cost
  if (user && user.orders && user.orders.length > 0) {
    let totalCost = 0;
    //@ts-ignore
    user.orders?.forEach((item: Order) => {
      totalCost = totalCost + item.price * item.quantity;
    });
    return totalCost;
  } else if (user === null) {
    return user;
  } else {
    return 'this user have no order';
  }
};

export const userService = {
  createUserIntoDB,
  geAllUserFromDB,
  geSingleUserFromDB,
  updateSingleUSerInDB,
  deleteSingleUSerInDB,
  createNewOrderInDB,
  getOrderListByIdFromDB,
  getTotalOrderPrice,
};
