import { Test, TestingModule } from '@nestjs/testing';
import { SuitOptionController } from './suit_option.controller';
import { SuitOptionService } from './suit_option.service';

describe('SuitOptionController', () => {
  let controller: SuitOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitOptionController],
      providers: [SuitOptionService],
    }).compile();

    controller = module.get<SuitOptionController>(SuitOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
