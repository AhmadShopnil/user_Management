/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

export interface User extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
