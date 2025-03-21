import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './role.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private entityManager: EntityManager
  ) {}

  @Get()
  @SetMetadata("public",true)
  getHello() {
    return this.entityManager.count(User, {
      where: {role: Role.USER}
    })

  }
}
