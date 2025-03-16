import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from 'src/dto/signin.input';
import { AuthPayload } from 'src/entities/auth_payload';
import { PublicHandler } from 'src/decorators/public.decorator';
import { User } from 'src/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @PublicHandler()
  @Mutation(() => AuthPayload)
  async signIn(@Args("input") input: SignInInput){
    const user = await this.authService.validateUser(input)
    return this.authService.generateToken(user)
  }

  @Query(() => User)
  async getProfile(@Context() context){
    return this.authService.findUserById(context.req.user.id)
  }
}
