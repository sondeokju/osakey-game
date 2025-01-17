import { Module } from '@nestjs/common';
import { SuitInfoService } from './suit_info.service';
import { SuitInfoController } from './suit_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuitInfo } from './entities/suit_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuitInfo])],
  exports: [SuitInfoService],
  controllers: [SuitInfoController],
  providers: [SuitInfoService],
})
export class SuitInfoModule {}
