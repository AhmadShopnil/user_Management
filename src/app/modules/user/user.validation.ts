import { z } from 'zod';

// Zod schema for the UserName
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

// Zod schema for the Address
const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Zod schema for the Order
const OrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  fullName: UserNameValidationSchema,
  password: z.string(),
  email: z.string().email(),
  age: z.number().min(1),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.optional(z.array(OrderValidationSchema)),
});

export default userValidationSchema;
