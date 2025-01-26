import { Module } from '@nestjs/common';
import { UserDispatchService } from './user_dispatch.service';
import { UserDispatchController } from './user_dispatch.controller';
import { UserDispatch } from './entities/user_dispatch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDispatch])],
  exports: [UserDispatchService],
  controllers: [UserDispatchController],
  providers: [UserDispatchService],
})
export class UserDispatchModule {}
