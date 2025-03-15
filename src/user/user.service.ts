import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateUserInput } from 'src/dto/create_user.input';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}


    async getAllUsers(limit,skip){
        if(limit > 15){
            throw new HttpException("You can not get more then 15 users", HttpStatus.BAD_REQUEST)
        }
        
        return this.usersRepository.find({skip: skip, take: limit})
    }

    async getUserById(id: number){
        const user = await this.usersRepository.findOne({where: {id}})
        console.log(user)
        if(!user){
            throw new HttpException("No user found", HttpStatus.NOT_FOUND)
        }
        return user
    }

    async createUser(createUser: CreateUserInput){
        const password = await argon2.hash(createUser.password)
        const newUser = await this.usersRepository.create({...createUser, password: password})
        return await this.usersRepository.save(newUser)
    }

    async updateUser(id: number, updatedInfo: CreateUserInput){
        const user = await this.usersRepository.preload({id,...updatedInfo});
        if (!user) {
            throw new HttpException("No user found with this ID", HttpStatus.NOT_FOUND);
        }
        
        return await this.usersRepository.save(user);
    }

    async deleteUser(id: number){
        const user = await this.usersRepository.findOne({where: {id}})
        if(!user){
            throw new HttpException("Can not delete non existing user",HttpStatus.NOT_FOUND)
        }
        return await this.usersRepository.remove(user)
    }

}
