import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMembershipDto } from './create-user_membership.dto';

export class UpdateUserMembershipDto extends PartialType(CreateUserMembershipDto) {}
