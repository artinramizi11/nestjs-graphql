import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateUserInput } from 'src/dto/create_user.input';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}


    async getAllUsers(){
        return this.usersRepository.find()
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
        const newUser = await this.usersRepository.create(createUser)
        return await this.usersRepository.save(newUser)
    }

    async updateUser(id: number, updatedInfo: CreateUserInput){
        const user = await this.usersRepository.preload({id,...updatedInfo});
        if (!user) {
            throw new HttpException("No user found with this ID", HttpStatus.NOT_FOUND);
        }
        
        return await this.usersRepository.save(user);
    }

}
