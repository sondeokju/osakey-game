import { Controller } from '@nestjs/common';
import { SecameDiaryService } from './secame_diary.service';

@Controller('suit')
export class SuitController {
  constructor(private readonly secameDiaryService: SecameDiaryService) {}
}
