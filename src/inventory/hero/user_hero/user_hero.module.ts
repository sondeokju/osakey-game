import { Module } from '@nestjs/common';
import { UserHeroService } from './user_hero.service';
import { UserHeroController } from './user_hero.controller';
import { UsersModule } from 'src/users/users.module';
import { HeroModule } from 'src/static-table/hero/hero.module';

@Module({
  imports: [UsersModule, HeroModule],
  exports: [UserHeroService],
  controllers: [UserHeroController],
  providers: [UserHeroService],
})
export class UserHeroModule {}
