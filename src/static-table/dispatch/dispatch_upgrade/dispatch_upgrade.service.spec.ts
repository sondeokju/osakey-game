import { Test, TestingModule } from '@nestjs/testing';
import { DispatchUpgradeService } from './dispatch_upgrade.service';

describe('DispatchUpgradeService', () => {
  let service: DispatchUpgradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchUpgradeService],
    }).compile();

    service = module.get<DispatchUpgradeService>(DispatchUpgradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
