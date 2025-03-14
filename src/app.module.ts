import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: true,
  }), UserModule, TypeOrmModule.forRoot({
    url: "postgresql://neondb_owner:npg_zdYtJ1Hsrwx4@ep-snowy-truth-a5l2ddzm-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    type: "postgres",
    port: 3306,
    entities: [User,Profile],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
