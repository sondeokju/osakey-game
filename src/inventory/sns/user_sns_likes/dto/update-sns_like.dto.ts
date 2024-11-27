import { PartialType } from '@nestjs/mapped-types';
import { CreateSnsLikeDto } from './create-sns_like.dto';

export class UpdateSnsLikeDto extends PartialType(CreateSnsLikeDto) {}
