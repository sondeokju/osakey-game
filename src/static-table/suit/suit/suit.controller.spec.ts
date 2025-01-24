import { Test, TestingModule } from '@nestjs/testing';
import { SuitController } from './suit.controller';
import { SuitService } from './suit.service';

describe('SuitController', () => {
  let controller: SuitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitController],
      providers: [SuitService],
    }).compile();

    controller = module.get<SuitController>(SuitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
