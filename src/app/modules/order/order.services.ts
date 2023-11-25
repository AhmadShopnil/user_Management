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

export const orderService = {
  createNewOrderInDB,
};
