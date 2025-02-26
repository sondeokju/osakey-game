import { Module } from '@nestjs/common';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';
import { UserDispatchRentamaController } from './user_dispatch_rentama.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDispatchRentama } from './entities/user_dispatch_rentama.entity';
import { DispatchModule } from 'src/static-table/dispatch/dispatch/dispatch.module';
import { ItemModule } from 'src/static-table/item/item.module';
import { DispatchUpgradeModule } from 'src/static-table/dispatch/dispatch_upgrade/dispatch_upgrade.module';
import { ResourceManagerModule } from 'src/supervisor/resource_manager/resource_manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDispatchRentama]),
    DispatchModule,
    ItemModule,
    DispatchUpgradeModule,
    ResourceManagerModule,
  ],
  exports: [UserDispatchRentamaService],
  controllers: [UserDispatchRentamaController],
  providers: [UserDispatchRentamaService],
})
export class UserDispatchRentamaModule {}
