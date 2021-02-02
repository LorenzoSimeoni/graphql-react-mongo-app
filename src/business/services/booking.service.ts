
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { Booking } from '../models/booking.model';
import { BookingModel } from '../models/booking.schema';
import { BookingInput } from '../models/booking-input.model';

@injectable()
export class BookingService {

  constructor(
  ) {
  }

  async getAllBookings(): Promise<Booking[]> {
    return await BookingModel.find().populate('created_events').lean();
  }

  async getBookingById(id: Types.ObjectId): Promise<Booking> {
    return BookingModel.findById(id).lean();
  }

  async createBooking(bookingInput: BookingInput): Promise<Booking> {
    try {
      const booking = new BookingModel({
        user: Types.ObjectId(bookingInput.user),
        event: Types.ObjectId(bookingInput.event)
      });

      return await booking.save();
    } catch (err) {
      throw err;
    }
  }

  async updateGeneric<T>(id: Types.ObjectId, updateSet: T): Promise<Booking> {
    const set = {
      ...updateSet,
    };

    try {
      const booking: Booking = await BookingModel.findOneAndUpdate(
        { _id: id },
        { $set: set },
        { new: true })
        .lean();
      return booking;
    } catch (err) {
      throw err;
    }
  }

  async deleteBooking(id: Types.ObjectId): Promise<boolean> {
    const deleteBooking = await BookingModel.deleteOne({ _id: id });
    return deleteBooking.n ? true : false;
  }
}
