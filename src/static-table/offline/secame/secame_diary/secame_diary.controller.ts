import { Controller } from '@nestjs/common';
import { SecameDiaryService } from './secame_diary.service';

@Controller('suit')
export class SecameDiaryController {
  constructor(private readonly secameDiaryService: SecameDiaryService) {}
}
