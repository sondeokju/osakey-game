import { Test, TestingModule } from '@nestjs/testing';
import { PassBountyController } from './pass_bounty.controller';
import { PassBountyService } from './pass_bounty.service';

describe('PassBountyController', () => {
  let controller: PassBountyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassBountyController],
      providers: [PassBountyService],
    }).compile();

    controller = module.get<PassBountyController>(PassBountyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
