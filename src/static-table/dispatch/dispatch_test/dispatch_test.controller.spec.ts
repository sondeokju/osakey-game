import { Test, TestingModule } from '@nestjs/testing';
import { DispatchTestController } from './dispatch_test.controller';
import { DispatchTestService } from './dispatch_test.service';

describe('DispatchTestController', () => {
  let controller: DispatchTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchTestController],
      providers: [DispatchTestService],
    }).compile();

    controller = module.get<DispatchTestController>(DispatchTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
