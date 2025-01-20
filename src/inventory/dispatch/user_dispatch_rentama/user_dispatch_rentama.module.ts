import { Module } from '@nestjs/common';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';
import { UserDispatchRentamaController } from './user_dispatch_rentama.controller';

@Module({
  controllers: [UserDispatchRentamaController],
  providers: [UserDispatchRentamaService],
})
export class UserDispatchRentamaModule {}
