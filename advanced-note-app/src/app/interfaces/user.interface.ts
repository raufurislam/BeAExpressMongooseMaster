// user.interface.ts

import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: IAddress;
}

export interface UserInstanceMethod {
  hashPassword(password: string): string;
}

export interface UserStaticMethod extends Model<IUser> {
  hashPassword(password: string): string;
}
