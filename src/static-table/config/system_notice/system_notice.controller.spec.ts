import { Test, TestingModule } from '@nestjs/testing';
import { SystemNoticeController } from './system_notice.controller';
import { SystemNoticeService } from './system_notice.service';

describe('SystemNoticeController', () => {
  let controller: SystemNoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemNoticeController],
      providers: [SystemNoticeService],
    }).compile();

    controller = module.get<SystemNoticeController>(SystemNoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
