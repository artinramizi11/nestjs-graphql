import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class SignInInput {
    @Field()
    @IsString()
    email: string 

    @Field()
    @IsString()
    @MinLength(3)
    password: string
}