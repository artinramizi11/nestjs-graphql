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
    getUsers(){
        return this.usersService.getAllUsers()
    }

    @Query(() => User, {name: "single_user"})
    getUserById(@Args("id", {type: () => Int}) id: number){
        return this.usersService.getUserById(id)
    }

    @ResolveField(() => Profile)
    async profile(@Parent() user: User){
        return await user.profile

    }

    @Mutation(() => User)
    createUser(@Args("input") createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)
    }

    @Mutation(() => User)
    updateUser(
        @Args("id", ParseIntPipe) id: number,
        @Args("input") updateUserInput: CreateUserInput
    ){
        return this.usersService.updateUser(id,updateUserInput)

    }

}
