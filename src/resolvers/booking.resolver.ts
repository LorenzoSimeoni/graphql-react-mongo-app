import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { Booking } from '../business/models/booking.model';
import { BookingInput } from '../business/models/booking-input.model';
import { BookingService } from '../business/services/booking.service';

@injectable()
@Resolver()
export class BookingResolver {

  constructor(
    private bookingService: BookingService
  ) {
    this.bookingService = new BookingService();
  }

  @Query(() => [Booking])
  async bookings(): Promise<Booking[]> {
    return await this.bookingService.getAllBookings();
  }

  @Query(() => Booking)
  async booking(@Arg('id') id: string): Promise<Booking> {
    return await this.bookingService.getBookingById(new Types.ObjectId(id));
  }

  @Mutation(() => Booking)
  async createBooking(@Arg('bookingInput') bookingInput: BookingInput): Promise<Booking> {
    try {
      const booking = await this.bookingService.createBooking(bookingInput);
      return booking;
    } catch (e) {
      throw new Error('Cannot create booking : ' + e);
    }
  }

  // // @Mutation(() => Booking) TODO LATER
  // // async updateBooking(@Arg('id') id: string, @Arg('update') updatedBooking: BookingInputUpdate): Promise<Booking> {
  // //   try {
  // //     const booking = await this.bookingService.updateGeneric<BookingInputUpdate>(new Types.ObjectId(id), updatedBooking);
  // //     return booking;
  // //   } catch (e) {
  // //     throw new Error('Can\'t update Booking with that ID : ' + id);
  // //   }
  // // }

  @Mutation(() => Boolean)
  async deleteBooking(@Arg('id') id: string): Promise<boolean> {
    try {
      return await this.bookingService.deleteBooking(new Types.ObjectId(id));
    } catch {
      throw new Error('Can\t delete Booking with that ID: ' + id);
    }
  }
}
