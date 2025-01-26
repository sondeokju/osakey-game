import { Module } from '@nestjs/common';
import { UserMemorizeService } from './user_memorize.service';
import { UserMemorizeController } from './user_memorize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemorize } from './entities/user_memorize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMemorize])],
  exports: [UserMemorizeService],
  controllers: [UserMemorizeController],
  providers: [UserMemorizeService],
})
export class UserMemorizeModule {}
