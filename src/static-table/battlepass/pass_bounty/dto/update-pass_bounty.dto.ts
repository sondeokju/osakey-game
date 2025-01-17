import { PartialType } from '@nestjs/mapped-types';
import { CreatePassBountyDto } from './create-pass_bounty.dto';

export class UpdatePassBountyDto extends PartialType(CreatePassBountyDto) {}
