import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserInput {

    @IsString()
    @Field()
    email: string 

    @IsString()
    @Field()
    password: string
}