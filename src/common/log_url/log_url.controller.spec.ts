import { Test, TestingModule } from '@nestjs/testing';
import { LogUrlController } from './log_url.controller';
import { LogUrlService } from './log_url.service';

describe('LogUrlController', () => {
  let controller: LogUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogUrlController],
      providers: [LogUrlService],
    }).compile();

    controller = module.get<LogUrlController>(LogUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
