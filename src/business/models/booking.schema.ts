import { model, Model, Schema, Types } from 'mongoose';
import { Booking } from './booking.model';


const BOOKING_SCHEMA = new Schema(Object.assign({
  event: { type: Types.ObjectId, required: true, ref: 'events' },
  user: { type: Types.ObjectId, required: true, ref: 'users' }
}), { timestamps: true });

export const BookingModel: Model<Booking> = model<Booking>('bookings', BOOKING_SCHEMA);
