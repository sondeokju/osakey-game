import { Controller } from '@nestjs/common';
import { DispatchTestService } from './dispatch_test.service';

@Controller('dispatch-test')
export class DispatchTestController {
  constructor(private readonly dispatchTestService: DispatchTestService) {}
}
