import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChallengeExtraDto } from './create-user_challenge_extra.dto';

export class UpdateUserChallengeExtraDto extends PartialType(CreateUserChallengeExtraDto) {}
