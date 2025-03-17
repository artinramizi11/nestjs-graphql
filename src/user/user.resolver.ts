import {  Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/dto/create_user.input';
import { PaginationArgs } from 'src/args/pagination.args';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/role.enum';
import { PublicHandler } from 'src/decorators/public.decorator';

@Resolver(() => User)
export class UserResolver {

    constructor(
        private usersService: UserService
    ){}

    @Roles(Role.ADMIN,Role.SUPERADMIN)
    @Query(() => [User] , {name: "get_users"})
    getUsers(@Args() paginationArgs: PaginationArgs){
        return this.usersService.getAllUsers(paginationArgs)
    }

    @Roles(Role.USER, Role.ADMIN)
    @PublicHandler()
    @Query(() => User, {name: "get_user_by_id"})
    getUserById(@Args("id", {type: () => Int}) id: number){
        return this.usersService.getUserById(id)
    }

    @Roles(Role.SUPERADMIN)
    @Mutation(() => User , {name:"create_user"})
    createUser(@Args("input") createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)
    }

    @Roles(Role.ADMIN)
    @Mutation(() => User, {name:"update_user"})
    updateUser(
        @Args("id", {type: () => Int}) id: number,   
        @Args("input") updateUserInput: CreateUserInput
    ){
        return this.usersService.updateUser(id,updateUserInput)

    }

    @Roles(Role.SUPERADMIN)
    @Mutation(() => User, {name:"delete_user"})
    deleteUser(@Args("id", {type: () => Int}) id: number){
        return this.usersService.deleteUser(id)
    }

}
