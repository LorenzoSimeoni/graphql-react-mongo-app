import { Types } from 'mongoose';
import { Field, Float, ID, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [ID])
  created_events: Types.ObjectId[];
}
