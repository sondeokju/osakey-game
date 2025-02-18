import { Controller } from '@nestjs/common';
import { ShopPackageService } from './shop_package.service';

@Controller('shop')
export class ShopPackageController {
  constructor(private readonly shopPackageService: ShopPackageService) {}
}
