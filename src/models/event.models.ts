import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Event {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  date: Date;
}
