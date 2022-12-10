import {
  Model, Schema, model
} from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export interface IUser {
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Password */
  firstName: string;
  /** Password */
  lastName: string;
  /** Created On */
  createdOn: Date;
  /** Created On */
  updatedOn: Date;
  encryptPassword: (password: string) => string;
  validPassword: (password: string) => boolean;
  generateResponseModel: () => UserResponseModel;
}

export class UserResponseModel {

  userId: string;

  firstName: string;

  lastName: string;

  email: string;
}

export interface IUserModel extends Model<IUser> {
}

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
}, { timestamps: true });

schema.methods.encryptPassword = (password: string) => hashSync(password, genSaltSync(10));

schema.methods.validPassword = function (password: string) {
  // @ts-ignore
  return compareSync(password, this.password);
};

schema.methods.generateResponseModel = function () {
  const user = new UserResponseModel();
  // @ts-ignore
  user.userId = this._id;
  // @ts-ignore
  user.firstName = this.firstName;
  // @ts-ignore
  user.lastName = this.lastName;
  // @ts-ignore
  user.email = this.email;
  return user;
};

export const User: IUserModel = model<IUser, IUserModel>('User', schema);
