import { Types } from 'mongoose';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [ID], { nullable: true })
  created_events: Types.ObjectId[];
}
