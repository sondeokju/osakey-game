import { Controller } from '@nestjs/common';
import { SuitOptionService } from './suit_option.service';

@Controller('suit')
export class SuitOptionController {
  constructor(private readonly suitOptionService: SuitOptionService) {}
}
