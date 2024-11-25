import { Controller } from '@nestjs/common';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';

@Controller('dispatch-equip-level')
export class DispatchEquipLevelController {
  constructor(
    private readonly dispatchEquipLevelService: DispatchEquipLevelService,
  ) {}
}
