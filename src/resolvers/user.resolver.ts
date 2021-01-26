import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { UserService } from '../business/services/users.service';
import { Types } from 'mongoose';
import { injectable } from 'inversify';
import { User } from '../business/models/user.model';
import { UserInputUpdate } from '../business/models/update-input-user.model';
import { UserInput } from '../business/models/user-input.model';
import bcrypt from 'bcrypt';
import lodash from 'lodash';

@injectable()
@Resolver()
export class UserResolver {

  constructor(
    private userService: UserService
  ) {
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
}
