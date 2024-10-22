import { Test, TestingModule } from '@nestjs/testing';
import { ControlTableController } from './control_table.controller';
import { ControlTableService } from './control_table.service';

describe('ControlTableController', () => {
  let controller: ControlTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlTableController],
      providers: [ControlTableService],
    }).compile();

    controller = module.get<ControlTableController>(ControlTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
