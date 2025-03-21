import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateUserInput } from 'src/dto/create_user.input';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'
import { PaginationArgs } from 'src/args/pagination.args';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}


    async getAllUsers(paginationArgs: PaginationArgs){
        if(paginationArgs.limit > 15){
            throw new BadRequestException("You can not set more then 15 users")
        }
        if(paginationArgs.skip < 0) {
            throw new BadRequestException("You can not set negative numbers in skip")
        }
        
        return this.usersRepository.find({skip: paginationArgs.skip, take: paginationArgs.limit})
    }

    async getUserById(id: number){
        const user = await this.usersRepository.findOne({where: {id}})
        if(!user){
            throw new NotFoundException(`No user found with ID: ${id}`)
        }
        return user
    }

    async createUser(createUser: CreateUserInput){
        const samePassword = await argon2.hash(createUser.password)
         try {
            const newUser = await this.usersRepository.create({...createUser, password: samePassword})
        return await this.usersRepository.save(newUser)
         } catch(err) {
            console.log(err)
            if(err.code === '23505'){
                throw new ConflictException("Email address is already in use")
            }
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
         }
                
    }

    async updateUser(id: number, updatedInfo: CreateUserInput){
        const user = await this.usersRepository.preload({id,...updatedInfo});
        if (!user) {
            throw new NotFoundException(`No user found with ID: ${id} to update`)
        }
        
        return await this.usersRepository.save(user);
    }

    async deleteUser(id: number){
        const user = await this.usersRepository.findOne({where: {id}})
        if(!user){
            throw new NotFoundException(`You can not delete a non-existing user`)
        }
        return await this.usersRepository.remove(user)
    }


    async testing(){
        return await this.usersRepository.find()
    }


}
