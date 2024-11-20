import { Test, TestingModule } from '@nestjs/testing';
import { SnsConfigController } from './sns_config.controller';
import { SnsConfigService } from './sns_config.service';

describe('SnsConfigController', () => {
  let controller: SnsConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsConfigController],
      providers: [SnsConfigService],
    }).compile();

    controller = module.get<SnsConfigController>(SnsConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
