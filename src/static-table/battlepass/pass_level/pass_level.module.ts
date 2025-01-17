import { Module } from '@nestjs/common';
import { PassLevelService } from './pass_level.service';
import { PassLevelController } from './pass_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassLevel } from './entities/pass_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PassLevel])],
  exports: [PassLevelService],
  controllers: [PassLevelController],
  providers: [PassLevelService],
})
export class PassLevelModule {}
