import { Module } from '@nestjs/common';
import { EduService } from './edu.service';
import { EduController } from './edu.controller';

@Module({
  controllers: [EduController],
  providers: [EduService],
})
export class EduModule {}
