import { Module } from '@nestjs/common';
import { SuitService } from './suit.service';
import { SuitController } from './suit.controller';

@Module({
  controllers: [SuitController],
  providers: [SuitService],
})
export class SuitModule {}
