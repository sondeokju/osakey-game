import { Module } from '@nestjs/common';
import { SuitOptionService } from './suit_option.service';
import { SuitOptionController } from './suit_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitOption } from './entities/suit_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitOption])],
  exports: [SuitOptionService],
  controllers: [SuitOptionController],
  providers: [SuitOptionService],
})
export class SuitOptionModule {}
