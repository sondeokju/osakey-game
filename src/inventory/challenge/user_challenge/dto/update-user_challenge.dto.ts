import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChallengeDto } from './create-user_challenge.dto';

export class UpdateUserChallengeDto extends PartialType(CreateUserChallengeDto) {}
