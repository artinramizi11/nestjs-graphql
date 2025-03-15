import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput } from 'src/dto/signin.input';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as argon2 from "argon2"
import { AuthPayload } from 'src/entities/auth_payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}

    async validateUser(inputs: SignInInput){
        const user = await this.usersRepository.findOne({where: {email: inputs.email}})
        if(!user){
            throw new UnauthorizedException()
        }
        const validatePassword = await argon2.verify(user.password,inputs.password)

        if(!validatePassword){
            throw new UnauthorizedException("Wrong Credentials")
        }

        return user
    }

    async generateToken(user: User) {

        const payload = {userId: user.id, email: user.email, role: user.role}
        const token = await this.jwtService.signAsync(payload,{secret: this.configService.get("jwt_secret_key")})

      return {
        userId: payload.userId,
        accessToken: token,
        role: user.role
      }
    }
}
