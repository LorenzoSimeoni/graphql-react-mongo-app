import { Event } from '../business/models/event.models';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { InputEvent } from '../business/models/event-input.model';
import { UpdateInputEvent } from '../business/models/update-event.model';
import { EventModel } from '../business/models/event.schema';
import { EventService } from '../business/services/events.service';
import { Types } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
@Resolver()
export class EventResolver {

  constructor(
    private eventService: EventService
  ) {
    this.eventService = new EventService();
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return await this.eventService.getAllEvents();
  }

  @Query(() => Event)
  async event(@Arg('id') id: string): Promise<Event> {
    return await this.eventService.getEventById(new Types.ObjectId(id));
  }

  @Mutation(() => Event)
  async createEvent(@Arg('inputEvent') inputEvent: InputEvent): Promise<Event> {
    try {
      const event = this.eventService.createEvent(inputEvent);
      return await event;
    } catch (e) {
      throw new Error('Cannot create event : ' + e);
    }
  }

  @Mutation(() => Event)
  async updateEvent(@Arg('id') id: string, @Arg('update') updatedEvent: UpdateInputEvent): Promise<Event> {
    try {
      const event = await this.eventService.updateGeneric<UpdateInputEvent>(new Types.ObjectId(id), updatedEvent);
      return event;
    } catch (e) {
      throw new Error('Can\'t update Event with that ID : ' + id);
    }
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg('id') id: string): Promise<boolean> {
    try {
      return await this.eventService.deleteEvent(new Types.ObjectId(id));
    } catch {
      throw new Error('Can\t delete Event with that ID: ' + id);
    }
  }
}
