import { Test, TestingModule } from '@nestjs/testing';
import { SuitSkillService } from './suit_skill.service';

describe('SuitSkillService', () => {
  let service: SuitSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitSkillService],
    }).compile();

    service = module.get<SuitSkillService>(SuitSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
