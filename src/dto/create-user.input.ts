import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserInput {

    @Field()
    @IsString()
    username: string 

    @Field()
    @IsString()
    password: string 

    @Field(() => Int, {nullable: true})
    @IsInt()
    @IsOptional()
    age?: number

    @Field({nullable: true})
    @IsOptional()
    @IsString()
    city: string 



}