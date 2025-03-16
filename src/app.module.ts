import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/JwtAuth.guard';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: true,
  }),
  ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }),
  UserModule,
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      url: configService.get("db_url") as string,
    type: "postgres",
    port: 3306,
    entities: [User,Profile],
    synchronize: true
    })
  }),
  ProfileModule,
  AuthModule,

],
  controllers: [AppController],
  providers: [AppService , {provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class AppModule {}
