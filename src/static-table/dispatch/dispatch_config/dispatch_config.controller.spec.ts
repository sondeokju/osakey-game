import { Test, TestingModule } from '@nestjs/testing';
import { DispatchConfigController } from './dispatch_config.controller';
import { DispatchConfigService } from './dispatch_config.service';

describe('DispatchConfigController', () => {
  let controller: DispatchConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchConfigController],
      providers: [DispatchConfigService],
    }).compile();

    controller = module.get<DispatchConfigController>(DispatchConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
