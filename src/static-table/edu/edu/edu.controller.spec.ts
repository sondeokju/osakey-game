import { Test, TestingModule } from '@nestjs/testing';
import { EduController } from './edu.controller';
import { EduService } from './edu.service';

describe('EduController', () => {
  let controller: EduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EduController],
      providers: [EduService],
    }).compile();

    controller = module.get<EduController>(EduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
