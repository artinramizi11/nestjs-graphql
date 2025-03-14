import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/dto/create-user.input';

@Resolver(() => User)
export class UserResolver {

    constructor(
        private usersService: UserService
    ){}

    @Query(() => [User], {name: "users"})
    getUsers() {
        return this.usersService.getUsers()
    }

    @Query(() => User, {name: "user"})
    getUser(@Args("id", {type: () => Int}) id: number){
        return this.usersService.getUserById(id)

    }

    @ResolveField('profile')
    async profile(@Parent() user: User) {
      return await user.profile;
    }

    @Mutation(() => User)
    createUser(@Args("input") createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)

    }
}
