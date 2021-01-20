import { Field, Float, ID, InputType } from "type-graphql";

@InputType()
export class InputEvent {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
