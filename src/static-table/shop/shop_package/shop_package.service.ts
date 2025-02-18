import { Injectable } from '@nestjs/common';
import { CreateShopPackageDto } from './dto/create-shop_package.dto';
import { UpdateShopPackageDto } from './dto/update-shop_package.dto';

@Injectable()
export class ShopPackageService {
  create(createShopPackageDto: CreateShopPackageDto) {
    return 'This action adds a new shopPackage';
  }

  findAll() {
    return `This action returns all shopPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopPackage`;
  }

  update(id: number, updateShopPackageDto: UpdateShopPackageDto) {
    return `This action updates a #${id} shopPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopPackage`;
  }
}
