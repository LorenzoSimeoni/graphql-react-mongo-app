

import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { UserService } from '../business/services/users.service';
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { User } from '../business/models/user.model';
import { UserInputUpdate } from '../business/models/update-input-user.model';
import { UserInput } from '../business/models/user-input.model';
import bcrypt from 'bcrypt';
import lodash from 'lodash';
import { EventService } from '../business/services/events.service';
import { Event } from '../business/models/event.models';
import { AuthData } from '../business/models/auth-data.model';
import jwt from 'jsonwebtoken';

@injectable()
@Resolver(() => User)
export class UserResolver {

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {
    this.eventService = new EventService();
    this.userService = new UserService();
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User> {
    return await this.userService.getUserById(new Types.ObjectId(id));
  }

  @Query(() => AuthData)
  async login(@Arg('email') email: string, @Arg('password') password: string): Promise<AuthData> {
    const user: User = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error('User does not exist');
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new Error('Password is incorrect');
    }
    const jwtToken = jwt.sign({ userId: user._id, email: user.email }, 'monhashtrestressecret', {
      expiresIn: '2h'
    });
    return { userId: user._id, token: jwtToken, tokenExpiration: 2 } as AuthData;
  }

  @Mutation(() => User)
  async createUser(@Arg('userInput') userInput: UserInput): Promise<User> {
    try {
      const hashPassword: string = await bcrypt.hash(userInput.password, 12);
      const user = this.userService.createUser({ ...lodash.omit(userInput, 'password'), password: hashPassword });
      return await user;
    } catch (e) {
      throw new Error('Cannot create user : ' + e);
    }
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('update') updatedUser: UserInputUpdate): Promise<User> {
    try {
      const user = await this.userService.updateGeneric<UserInputUpdate>(new Types.ObjectId(id), updatedUser);
      return user;
    } catch (e) {
      throw new Error('Can\'t update User with that ID : ' + id);
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string): Promise<boolean> {
    try {
      return await this.userService.deleteUser(new Types.ObjectId(id));
    } catch {
      throw new Error('Can\t delete User with that ID: ' + id);
    }
  }

  // @FieldResolver(() => [Event], { name: 'created_events' })
  // async events(@Root() user: User): Promise<Event[]> {
  //   console.log('in resolver of user');
  //   const events = await Promise.all(user.created_events.map(async (event) => {
  //     return await this.eventService.getEventById(event);
  //   }));
  //   return events;
  // }
}
