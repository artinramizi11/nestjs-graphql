import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthPayload {
    @Field(() => Int)
    userId: number 

    @Field()
    accessToken: string

    @Field()
    role: string
}