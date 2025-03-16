import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile])],
  providers: [UserResolver, UserService , JwtService],
})
export class UserModule {}
