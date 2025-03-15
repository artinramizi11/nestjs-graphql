import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileInput } from 'src/dto/create_profile.input';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    async findProfiles(){
        return await this.profileRepository.find()
    }

    async findProfileById(id){
        const profile = await this.profileRepository.findOne({where: {id}})
        if(!profile){
            throw new HttpException("Profile not found",HttpStatus.NOT_FOUND)
        }
        return profile
    }

    async createProfile(userId: number, createProfile: CreateProfileInput){
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if(!user){
            throw new HttpException("You cant add a profile for non existing users",HttpStatus.BAD_REQUEST)
        }
        const profile = await this.profileRepository.findOne({where: {user: {id: userId}}})
        if(profile){
            throw new HttpException("A profile already exists in this user id", HttpStatus.BAD_REQUEST)
        }

        const addProfile = await this.profileRepository.create({...createProfile, user: {id: userId}})
        return await this.profileRepository.save(addProfile)
       

    }

}
