import { Test, TestingModule } from '@nestjs/testing';
import { DispatchUpgradeController } from './dispatch_upgrade.controller';
import { DispatchUpgradeService } from './dispatch_upgrade.service';

describe('DispatchUpgradeController', () => {
  let controller: DispatchUpgradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchUpgradeController],
      providers: [DispatchUpgradeService],
    }).compile();

    controller = module.get<DispatchUpgradeController>(DispatchUpgradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
