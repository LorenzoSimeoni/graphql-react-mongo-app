import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class AuthData extends Document {

  @Field(() => ID)
  userId: Types.ObjectId;

  @Field()
  token: string;

  @Field(() => Int)
  tokenExpiration: number;
}
