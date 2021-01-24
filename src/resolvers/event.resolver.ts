import { Event } from '../business/models/event.models';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { InputEvent } from '../business/models/createEvent.model';
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

  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Query(() => [Event])
  events(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Query(() => Event)
  event(@Arg('id') id: string) {
    return this.eventService.getEventById(new Types.ObjectId(id));
  }

  // @Mutation(() => Event)
  // createEvent(@Arg('newEvent') newEvent: InputEvent) {
  //   const existingEvent = events.find(event => event._id.toHexString() == newEvent._id);
  //   if (!existingEvent) {
  //     const event = {
  //       _id: newEvent._id,
  //       title: newEvent.title,
  //       description: newEvent.description,
  //       price: newEvent.price,
  //       date: new Date()
  //     }
  //     events.push(event);
  //     return event;
  //   } else {
  //     throw new Error('Event already exist with ID : ' + newEvent._id);
  //   }
  // }

  // @Mutation(() => Event)
  // updateEvent(@Arg('id') id: string, @Arg('update') updatedEvent: UpdateInputEvent) {
  //   let index = events.findIndex(event => event._id.toHexString() === id);
  //   if (index !== -1) {

  //     const event = await new EventModel
  //     events[index] = {
  //       _id: events[index]._id,
  //       title: updatedEvent.title ?? events[index].title,
  //       description: updatedEvent.description ?? events[index].description,
  //       price: updatedEvent.price ?? events[index].price,
  //       date: events[index].date
  //     }
  //     return events[index];
  //   } else {
  //     throw new Error('No event find with that ID : ' + id);
  //   }
  // }

  // @Mutation(() => Boolean)
  // deleteEvent(@Arg('id') id: string) {
  //   const index = events.findIndex(event => event._id.toHexString() === id);
  //   if (index != -1) {
  //     events = events.splice(index, 1);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
