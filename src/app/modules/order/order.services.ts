import { UserModel } from '../user/user.model';
import { Order } from './order.interface';

const createNewOrderInDB = async (userId: number, orderData: Order) => {
  const user = await UserModel.findOne({ userId });

  if (user?.userId) {
    if (user.orders && Array.isArray(user.orders)) {
      // Append the new order to the existing 'orders' array
      user.orders.push(orderData);

      const result = await UserModel.updateOne({ userId }, { $set: user });
      return result;
    } else {
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

export const orderService = {
  createNewOrderInDB,
  getOrderListByIdFromDB,
  getTotalOrderPrice,
};
