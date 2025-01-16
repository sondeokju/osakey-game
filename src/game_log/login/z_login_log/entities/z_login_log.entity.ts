import { Column, Entity, Index } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidatioMessage } from 'src/common/validation-message/string-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { Exclude } from 'class-transformer';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Exclude()
export class ZLoginLog extends BaseModel {
  @Column({
    length: 10,
    type: 'char',
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  @Index({ unique: false })
  member_id: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  sicail_type: string;
}
