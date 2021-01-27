import { EventModel } from '../models/event.schema';
import { Event } from '../models/event.models';
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { InputEvent } from 'business/models/event-input.model';

@injectable()
export class EventService {

  constructor(
  ) {
  }

  async getAllEvents(): Promise<Event[]> {
    return await EventModel.find().lean();
  }

  async getEventById(id: Types.ObjectId): Promise<Event> {
    return EventModel.findById(id).lean();
  }

  // TODO ADD ROLLBACK
  async createEvent(inputEvent: InputEvent): Promise<Event> {
    try {
      const event = new EventModel({
        title: inputEvent.title,
        description: inputEvent.description,
        price: inputEvent.price,
        date: inputEvent.date ? new Date(inputEvent.date) : new Date(),
        created_by: inputEvent.created_by,
        created_date: new Date()
      });

      return await event.save();
    } catch (err) {
      throw err;
    }
  }

  async updateGeneric<T>(id: Types.ObjectId, updateSet: T): Promise<Event> {
    const set = {
      ...updateSet,
      // updated_by: options?.user, TODO
      // updated_date: new Date()
    };

    try {
      const event: Event = await EventModel.findOneAndUpdate(
        { _id: id },
        { $set: set },
        { new: true })
        .lean();
      return event;
    } catch (err) {
      throw err;
    }
  }

  async deleteEvent(id: Types.ObjectId): Promise<boolean> {
    const deleteEvent = await EventModel.deleteOne({ _id: id });
    return deleteEvent.n ? true : false;
  }
}
