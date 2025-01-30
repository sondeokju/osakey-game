import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UserSettingModule } from 'src/supervisor/user_setting/user_setting.module';
import { UserSettingService } from 'src/supervisor/user_setting/user_setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Hero]), UserSettingModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HeroService, UserSettingService],
})
export class UsersModule {}
