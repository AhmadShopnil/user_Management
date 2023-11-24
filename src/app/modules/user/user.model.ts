import { Schema, model } from 'mongoose';

import { Address, User, UserName } from './user.interface';

const userNameSchema = new Schema<UserName>({
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

const AddressSchema = new Schema<Address>({
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

const UserSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: String,
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
});

export const UserModel = model<User>('User', UserSchema);
