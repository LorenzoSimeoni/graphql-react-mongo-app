import { Event } from '../business/models/event.models';
import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { InputEvent } from '../business/models/event-input.model';
import { UpdateInputEvent } from '../business/models/update-event.model';
import { EventModel } from '../business/models/event.schema';
import { EventService } from '../business/services/events.service';
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { UserService } from '../business/services/users.service';
import { User } from '../business/models/user.model';

@injectable()
@Resolver(() => Event)
export class EventResolver {

  constructor(
    private eventService: EventService,
    private userService: UserService

  ) {
    this.eventService = new EventService();
    this.userService = new UserService();
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    const events: Event[] = await this.eventService.getAllEvents();
    return events;
  }

  @Query(() => Event)
  async event(@Arg('id') id: string): Promise<Event> {
    return await this.eventService.getEventById(new Types.ObjectId(id));
  }

  @Mutation(() => Event)
  async createEvent(@Arg('inputEvent') inputEvent: InputEvent): Promise<Event> {
    try {
      const event = await this.eventService.createEvent(inputEvent);
      const user = await this.userService.getUserById(event.created_by);
      if (user) {
        user.created_events.push(event._id);
        await this.userService.updateGeneric(event.created_by, { created_events: user.created_events });
      } else {
        throw new Error('This user ID does not exist: ' + event.created_by);
      }
      return event;
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

  // @FieldResolver(() => User, { name: 'created_by' })
  // async user(@Root() event: Event): Promise<User> {
  //   console.log('in field Resolver');
  //   const user = await this.userService.getUserById(event.created_by);
  //   return user;
  // }
}
