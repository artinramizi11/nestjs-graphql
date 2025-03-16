import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile.entity';
import { CreateProfileInput } from 'src/dto/create_profile.input';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/role.enum';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Roles(Role.USER)
  @Query(() => [Profile],{name: "get_all_profiles"})
  getProfiles(){
    return this.profileService.findProfiles()
  }

  @Roles(Role.USER)
  @Query(() => Profile, {name: "get_profile_by_id"})
  getProfile(@Args("id", {type: () => Int}) id: number){
    return this.profileService.findProfileById(id)
  }

  @Roles(Role.ADMIN)
  @Mutation(() => Profile)
  createProfile(
    @Args("userId", {type: () => Int}) userId: number,
    @Args("input") createProfile: CreateProfileInput  
  ){
    return this.profileService.createProfile(userId,createProfile)

  }
}
