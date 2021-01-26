import { model, Model, Schema } from 'mongoose';
import { Event } from './event.models';


const EVENT_SCHEMA = new Schema(Object.assign({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true }
}));

export const EventModel: Model<Event> = model<Event>('events', EVENT_SCHEMA);
