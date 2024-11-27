import { Module } from '@nestjs/common';
import { DispatchTestService } from './dispatch_test.service';
import { DispatchTestController } from './dispatch_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchTest } from './entities/dispatch_test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchTest])],
  exports: [DispatchTestService],
  controllers: [DispatchTestController],
  providers: [DispatchTestService],
})
export class DispatchTestModule {}
