import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class InputEvent {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  date: string;
}
