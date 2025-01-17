import { Module } from '@nestjs/common';
import { PassEduService } from './pass_edu.service';
import { PassEduController } from './pass_edu.controller';

@Module({
  controllers: [PassEduController],
  providers: [PassEduService],
})
export class PassEduModule {}
