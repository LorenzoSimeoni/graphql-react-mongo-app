import { Field, Float, ID, InputType } from "type-graphql";

@InputType()
export class InputEvent {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
