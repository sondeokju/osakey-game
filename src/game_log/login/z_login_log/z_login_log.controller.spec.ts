import { Test, TestingModule } from '@nestjs/testing';
import { ZLoginLogController } from './z_login_log.controller';
import { ZLoginLogService } from './z_login_log.service';

describe('ZLoginLogController', () => {
  let controller: ZLoginLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZLoginLogController],
      providers: [ZLoginLogService],
    }).compile();

    controller = module.get<ZLoginLogController>(ZLoginLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
