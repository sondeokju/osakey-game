import { Test, TestingModule } from '@nestjs/testing';
import { PassEduController } from './pass_edu.controller';
import { PassEduService } from './pass_edu.service';

describe('PassEduController', () => {
  let controller: PassEduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassEduController],
      providers: [PassEduService],
    }).compile();

    controller = module.get<PassEduController>(PassEduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
