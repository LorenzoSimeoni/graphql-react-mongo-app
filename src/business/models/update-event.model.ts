import { Field, Float, InputType } from "type-graphql";

@InputType()
export class UpdateInputEvent {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Float, { nullable: true })
  price: number;
}
