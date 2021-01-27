import { model, Model, Schema, Types } from 'mongoose';
import { Event } from './event.models';


const EVENT_SCHEMA = new Schema(Object.assign({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  created_by: { type: Types.ObjectId, required: true, ref: 'users' },
  created_date: { type: Date, required: true }
}));

export const EventModel: Model<Event> = model<Event>('events', EVENT_SCHEMA);
