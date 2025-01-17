import { Module } from '@nestjs/common';
import { PassLevelService } from './pass_level.service';
import { PassLevelController } from './pass_level.controller';

@Module({
  controllers: [PassLevelController],
  providers: [PassLevelService],
})
export class PassLevelModule {}
