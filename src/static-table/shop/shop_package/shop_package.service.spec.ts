import { Test, TestingModule } from '@nestjs/testing';
import { ShopPackageService } from './shop_package.service';

describe('ShopPackageService', () => {
  let service: ShopPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopPackageService],
    }).compile();

    service = module.get<ShopPackageService>(ShopPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
