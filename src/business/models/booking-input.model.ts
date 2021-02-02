import { Field, InputType } from 'type-graphql';

@InputType()
export class BookingInput {

  @Field()
  event: string;

  @Field()
  user: string;
}
