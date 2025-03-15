import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from 'src/dto/signin.input';
import { AuthPayload } from 'src/entities/auth_payload';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args("input") input: SignInInput){
    const user = await this.authService.validateUser(input)
    return this.authService.generateToken(user)
  }
}
