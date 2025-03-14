import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/dto/create-user.input';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    async getUsers(){
        const users = await this.usersRepository.find()
        console.log(users)
        return await this.usersRepository.find()
    }

    async getUserById(id: number){
        const user = await this.usersRepository.findOne({where: {id}})
       if(!user){
        throw new HttpException("No user found",HttpStatus.NOT_FOUND)
       }
       return user
    }
    
    async createUser(createUserInput: CreateUserInput){
        try {
             const newUser = await this.usersRepository.create(createUserInput)
             return await this.usersRepository.save(newUser)
        } catch(err){
            return err
        }
        
    }
}
