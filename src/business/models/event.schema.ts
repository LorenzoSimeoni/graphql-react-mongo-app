import { model, Model, Schema } from "mongoose";
import { Event } from "./event.models";


const EVENT_SCHEMA = new Schema(Object.assign({
  title: String,
  description: String,
  price: Number,
  date: Date
}));

export const EventModel: Model<Event> = model<Event>('events', EVENT_SCHEMA);
