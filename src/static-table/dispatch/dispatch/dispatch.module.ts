import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatch } from './entities/dispatch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispatch])],
  exports: [DispatchService],
  controllers: [DispatchController],
  providers: [DispatchService],
})
export class DispatchModule {}
