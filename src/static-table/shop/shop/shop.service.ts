import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  getShopRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Shop>(Shop) : this.shopRepository;
  }

  async getShopAll(qr?: QueryRunner) {
    const shopRepository = this.getShopRepository(qr);
    const result = await shopRepository.find({});
    return result;
  }

  async getShop(shop_id: number, qr?: QueryRunner) {
    const shopRepository = this.getShopRepository(qr);
    const result = await shopRepository.findOne({
      where: {
        shop_id,
      },
    });

    return result;
  }
}
