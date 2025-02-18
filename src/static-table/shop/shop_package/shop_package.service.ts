import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ShopPackage } from './entities/shop_package.entity';

@Injectable()
export class ShopPackageService {
  constructor(
    @InjectRepository(ShopPackage)
    private readonly shopPackageRepository: Repository<ShopPackage>,
  ) {}

  getShopPackageRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ShopPackage>(ShopPackage)
      : this.shopPackageRepository;
  }

  async getShopPackageAll(qr?: QueryRunner) {
    const shopPackageRepository = this.getShopPackageRepository(qr);
    const result = await shopPackageRepository.find({});
    return result;
  }

  async getShopPackageList(shop_package_id: number, qr?: QueryRunner) {
    const shopPackageRepository = this.getShopPackageRepository(qr);
    const result = await shopPackageRepository.find({
      where: {
        shop_package_id,
      },
    });

    return result;
  }
}
