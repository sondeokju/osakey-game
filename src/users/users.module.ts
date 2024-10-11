import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { Item } from 'src/static-table/item/entities/item.entity';
import { ItemService } from 'src/static-table/item/item.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, Hero, Item])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HeroService, ItemService],
})
export class UsersModule {}
