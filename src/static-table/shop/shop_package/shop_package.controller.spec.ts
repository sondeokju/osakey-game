import { Test, TestingModule } from '@nestjs/testing';
import { ShopPackageController } from './shop_package.controller';
import { ShopPackageService } from './shop_package.service';

describe('ShopPackageController', () => {
  let controller: ShopPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopPackageController],
      providers: [ShopPackageService],
    }).compile();

    controller = module.get<ShopPackageController>(ShopPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
