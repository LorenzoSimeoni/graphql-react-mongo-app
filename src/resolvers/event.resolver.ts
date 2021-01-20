import { Event } from '../models/event.models';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { InputEvent } from '../models/createEvent.model';
import { UpdateInputEvent } from '../models/update-event.model';

let events: Event[] = [{
  _id: '1',
  title: 'FirstEvent',
  description: 'FIRST EVENT EZ',
  price: 1000,
  date: new Date()
}]

@Resolver()
export class EventResolver {

  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Query(() => [Event])
  events() {
    return events
  }

  @Query(() => Event)
  event(@Arg('id') id: string) {
    return events.find(event => event._id === id)
  }

  @Mutation(() => Event)
  createEvent(@Arg('newEvent') newEvent: InputEvent) {
    const existingEvent = events.find(event => event._id == newEvent._id);
    if (!existingEvent) {
      const event = {
        _id: newEvent._id,
        title: newEvent.title,
        description: newEvent.description,
        price: newEvent.price,
        date: new Date()
      }
      events.push(event);
      return event;
    } else {
      throw new Error('Event already exist with ID : ' + newEvent._id);
    }
  }

  @Mutation(() => Event)
  updateEvent(@Arg('id') id: string, @Arg('update') updatedEvent: UpdateInputEvent) {
    let index = events.findIndex(event => event._id === id);
    if (index !== -1) {
      events[index] = {
        _id: id,
        title: updatedEvent.title ?? events[index].title,
        description: updatedEvent.description ?? events[index].description,
        price: updatedEvent.price ?? events[index].price,
        date: events[index].date
      }
      return events[index];
    } else {
      throw new Error('No event find with that ID : ' + id);
    }
  }

  @Mutation(() => Boolean)
  deleteEvent(@Arg('id') id: string) {
    const index = events.findIndex(event => event._id === id);
    if (index != -1) {
      events = events.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
