import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserInput } from 'src/dto/create_user.input';
import { CreateProfileInput } from 'src/dto/create_profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile],{name: "profiles"})
  getProfiles(){
    return this.profileService.findProfiles()
  }

  @Query(() => Profile, {name: "profile"})
  getProfile(@Args("id", {type: () => Int}) id: number){
    return this.profileService.findProfileById(id)
  }

  @Mutation(() => Profile)
  createProfile(
    @Args("userId", {type: () => Int}) userId: number,
    @Args("input") createProfile: CreateProfileInput  
  ){
    return this.profileService.createProfile(userId,createProfile)

  }
}
