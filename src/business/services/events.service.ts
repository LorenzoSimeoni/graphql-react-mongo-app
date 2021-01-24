import { EventModel } from '../models/event.schema';
import { Event } from '../models/event.models';
import { Query, Types } from 'mongoose';
import { injectable } from 'inversify';
import { InputEvent } from 'business/models/createEvent.model';

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

  async createEvent(inputEvent: InputEvent): Promise<Event> {
    // const user = lodash.get(options, 'user'); TODO
    // const createdDate = new Date();

    try {
      // eventToCreate.created_by = user;
      // eventToCreate.created_date = createdDate; TODO
      const event = {
        title: inputEvent.title,
        description: inputEvent.description,
        price: inputEvent.price,
        date: new Date()
      };

      return (await new EventModel(event).save()).toObject() as Event;
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
