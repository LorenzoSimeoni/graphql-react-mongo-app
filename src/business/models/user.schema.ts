import { model, Model, Schema, Types } from 'mongoose';
import { User } from './user.model';


const USER_SCHEMA = new Schema(Object.assign({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_events: [
    { type: Types.ObjectId, ref: 'events' }
  ]
}));

export const UserModel: Model<User> = model<User>('users', USER_SCHEMA);
