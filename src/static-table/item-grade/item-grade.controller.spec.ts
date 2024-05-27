import { Test, TestingModule } from '@nestjs/testing';
import { ItemGradeController } from './item-grade.controller';
import { ItemGradeService } from './item-grade.service';

describe('ItemGradeController', () => {
  let controller: ItemGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemGradeController],
      providers: [ItemGradeService],
    }).compile();

    controller = module.get<ItemGradeController>(ItemGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
