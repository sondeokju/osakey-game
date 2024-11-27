import { Module } from '@nestjs/common';
import { UserRentamaService } from './user_rentama.service';
import { UserRentamaController } from './user_rentama.controller';
import { UserRentama } from './entities/user_rentama.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchTestService } from 'src/static-table/dispatch/dispatch_test/dispatch_test.service';
import { DispatchTest } from 'src/static-table/dispatch/dispatch_test/entities/dispatch_test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRentama, DispatchTest])],
  exports: [UserRentamaService],
  controllers: [UserRentamaController],
  providers: [UserRentamaService, DispatchTestService],
})
export class UserRentamaModule {}
