import {  Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { ParseIntPipe } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { CreateUserInput } from 'src/dto/create_user.input';

@Resolver(() => User)
export class UserResolver {

    constructor(
        private usersService: UserService
    ){}

    @Query(() => [User] , {name: "users"})
    getUsers(
        @Args("limit", {type: () => Int}) limit: number,
        @Args("skip", {type: () => Int}) skip: number
    ){
        return this.usersService.getAllUsers(limit,skip)
    }

    @Query(() => User, {name: "single_user"})
    getUserById(@Args("id", {type: () => Int}) id: number){
        return this.usersService.getUserById(id)
    }

    @Mutation(() => User)
    createUser(@Args("input") createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)
    }

    @Mutation(() => User)
    updateUser(
        @Args("id", {type: () => Int}) id: number,   
        @Args("input") updateUserInput: CreateUserInput
    ){
        return this.usersService.updateUser(id,updateUserInput)

    }

    @Mutation(() => User)
    deleteUser(@Args("id", {type: () => Int}) id: number){
        return this.usersService.deleteUser(id)
    }

}
