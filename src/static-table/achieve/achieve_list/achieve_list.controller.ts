import { Controller } from '@nestjs/common';
import { AchieveListService } from './achieve_list.service';

@Controller('achieve-list')
export class AchieveListController {
  constructor(private readonly achieveListService: AchieveListService) {}
}
