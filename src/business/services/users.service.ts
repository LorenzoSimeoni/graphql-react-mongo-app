
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { User } from '../models/user.model';
import { UserModel } from '../models/user.schema';
import { UserInput } from '../models/user-input.model';
import { Event } from '../models/event.models';
import lodash from 'lodash';

@injectable()
export class UserService {

  constructor(
  ) {
  }

  async getAllUsers(): Promise<User[]> {
    return await UserModel.find().populate('created_events').lean();
  }

  async getUserById(id: Types.ObjectId): Promise<User> {
    return UserModel.findById(id).lean();
  }

  async createUser(userInput: UserInput): Promise<User> {
    try {
      const user = new UserModel({
        email: userInput.email,
        password: userInput.password,
        created_events: userInput.created_events
      });

      return await user.save();
    } catch (err) {
      throw err;
    }
  }

  async updateGeneric<T>(id: Types.ObjectId, updateSet: T): Promise<User> {
    const set = {
      ...updateSet,
    };

    try {
      const user: User = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: set },
        { new: true })
        .lean();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: Types.ObjectId): Promise<boolean> {
    const deleteUser = await UserModel.deleteOne({ _id: id });
    return deleteUser.n ? true : false;
  }
}
