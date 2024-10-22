import { Test, TestingModule } from '@nestjs/testing';
import { ControlTableService } from './control_table.service';

describe('ControlTableService', () => {
  let service: ControlTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlTableService],
    }).compile();

    service = module.get<ControlTableService>(ControlTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
