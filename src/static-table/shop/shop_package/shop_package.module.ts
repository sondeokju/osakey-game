import { Module } from '@nestjs/common';
import { ShopPackageService } from './shop_package.service';
import { ShopPackageController } from './shop_package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopPackage } from './entities/shop_package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopPackage])],
  exports: [ShopPackageService],
  controllers: [ShopPackageController],
  providers: [ShopPackageService],
})
export class ShopPackageModule {}
