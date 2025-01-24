import { Module } from '@nestjs/common';
import { SuitService } from './suit.service';
import { SuitController } from './suit.controller';
import { Suit } from './entities/suit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Suit])],
  exports: [SuitService],
  controllers: [SuitController],
  providers: [SuitService],
})
export class SuitModule {}
