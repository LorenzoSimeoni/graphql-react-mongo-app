import { model, Model, Schema, Types } from 'mongoose';
import { Event } from './event.models';
import { User } from './user.model';


const USER_SCHEMA = new Schema(Object.assign({
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_events: [
    { type: Types.ObjectId, ref: Event }
  ]
}));

export const UserModel: Model<User> = model<User>('users', USER_SCHEMA);
