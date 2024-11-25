import { Test, TestingModule } from '@nestjs/testing';
import { EduReduceTimeController } from './edu_reduce_time.controller';
import { EduReduceTimeService } from './edu_reduce_time.service';

describe('EduReduceTimeController', () => {
  let controller: EduReduceTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EduReduceTimeController],
      providers: [EduReduceTimeService],
    }).compile();

    controller = module.get<EduReduceTimeController>(EduReduceTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
