import { Module } from '@nestjs/common';
import { OfflineService } from './offline.service';
import { OfflineController } from './offline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offline } from './entities/offline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offline])],
  exports: [OfflineService],
  controllers: [OfflineController],
  providers: [OfflineService],
})
export class OfflineModule {}
