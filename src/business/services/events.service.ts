import { EventModel } from '../models/event.schema';
import { Event } from '../models/event.models';
import { Types } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class EventService {

  constructor() {
  }

  async getAllEvents(): Promise<Event[]> {
    return await EventModel.find().lean();
  }

  async getEventById(id: Types.ObjectId): Promise<Event> {
    return EventModel.findById(id).lean();
  }

}
