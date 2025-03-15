import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsString, min } from "class-validator";

@InputType()
export class CreateProfileInput {
    @IsString()
    @Field()
    address: string 

    @IsString()
    @Field()
    city: string 

    @IsInt()
    @Field(() => Int)
    postalCode: number 

}