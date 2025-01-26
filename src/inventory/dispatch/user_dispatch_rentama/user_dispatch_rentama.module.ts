import { Module } from '@nestjs/common';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';
import { UserDispatchRentamaController } from './user_dispatch_rentama.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDispatchRentama } from './entities/user_dispatch_rentama.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDispatchRentama])],
  exports: [UserDispatchRentamaService],
  controllers: [UserDispatchRentamaController],
  providers: [UserDispatchRentamaService],
})
export class UserDispatchRentamaModule {}
