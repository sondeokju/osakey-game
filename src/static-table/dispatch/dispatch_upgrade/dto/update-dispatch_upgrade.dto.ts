import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchUpgradeDto } from './create-dispatch_upgrade.dto';

export class UpdateDispatchUpgradeDto extends PartialType(CreateDispatchUpgradeDto) {}
