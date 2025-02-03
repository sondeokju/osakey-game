import { Test, TestingModule } from '@nestjs/testing';
import { InvenController } from './inven.controller';
import { InvenService } from './inven.service';

describe('InvenController', () => {
  let controller: InvenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvenController],
      providers: [InvenService],
    }).compile();

    controller = module.get<InvenController>(InvenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
