import { Schema, model } from 'mongoose';

import { TAddress, TOrder, TUser, TUserName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is must Required'],
    maxlength: [20, 'FirstName can not be more then 20 characters '],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is must Required'],
    maxlength: [20, 'FirstName can not be more then 20 characters '],
    trim: true,
  },
});

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street is must Required'],
  },
  city: {
    type: String,
    required: [true, 'city is must Required'],
  },
  country: {
    type: String,
    required: [true, 'country is must Required'],
  },
});

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'productName is must Required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'price is must Required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is must Required'],
  },
});

const UserSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'Name is must Required'],
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: { type: Number, required: true },
  isActive: {
    type: Boolean,

    default: true,
  },
  hobbies: [String],
  address: AddressSchema,
  orders: [
    {
      type: OrderSchema,
    },
  ],
});

// pre save middleware hass pasword
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// UserSchema.pre('save', function (doc, next) {

// });

UserSchema.methods.toJSON = function () {
  const deletedPass = this.toObject();
  delete deletedPass.password;
  return deletedPass;
};

export const UserModel = model<TUser>('User', UserSchema);
