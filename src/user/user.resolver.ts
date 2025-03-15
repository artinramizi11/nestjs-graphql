import {  Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { CreateUserInput } from 'src/dto/create_user.input';
import { PaginationArgs } from 'src/args/pagination.args';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';

@Resolver(() => User)
export class UserResolver {

    constructor(
        private usersService: UserService
    ){}

    @Query(() => [User] , {name: "users"})
    getUsers(@Args() paginationArgs: PaginationArgs){
        return this.usersService.getAllUsers(paginationArgs)
    }

    @UseGuards(JwtAuthGuard)
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
