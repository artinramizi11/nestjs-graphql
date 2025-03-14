import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateUserInput {

    @IsString()
    @Field()
    email: string 

    @IsString()
    @Field()
    password: string
}