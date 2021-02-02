import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Event } from './event.models';
import { User } from './user.model';

@ObjectType()
export class Booking extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Event)
  event: Types.ObjectId;

  @Field(() => User)
  user: Types.ObjectId;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
