import { Document, Types } from 'mongoose';
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Event extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  date: Date;
}
