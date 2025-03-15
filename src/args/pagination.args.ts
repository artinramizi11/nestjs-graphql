import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
    @Field(() => Int)
    limit: number 

    @Field(() => Int)
    skip: number
}