import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [ID])
  created_events: Types.ObjectId[];
}
