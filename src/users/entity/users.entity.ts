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
export class Users extends BaseModel {
  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_login_date: Date;

  @Column({
    length: 10,
    type: 'char',
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: 'SY372F9',
  })
  @Index({ unique: false })
  nickname: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  @Index({ unique: false })
  member_id: string;

  @Column({
    length: 128,
    type: 'varchar',
    default: '',
  })
  @Index({ unique: false })
  provider: string;

  @Column({
    length: 512,
  })
  @IsString({
    message: stringValidatioMessage,
  })
  @Index({ unique: false })
  device_id: string;

  @Column({
    length: 512,
    default: '',
  })
  @IsString({
    message: stringValidatioMessage,
  })
  @Index({ unique: false })
  pgs_id: string;

  @Column({
    length: 1,
    default: '',
  })
  @IsString({
    message: stringValidatioMessage,
  })
  os_type: string;

  // 0:일반, 1:신규, 2:복귀, 3:정지
  @Column({
    default: 0,
  })
  status: number;

  @Column({})
  @IsString({
    message: stringValidatioMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidationMessage,
    },
  )
  @IsNotEmpty()
  @Index({ unique: false })
  email: string;

  @Column()
  @IsString({
    message: stringValidatioMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    //enum: Object.values(RolesEnum),
    //default: RolesEnum.USER,
    default: 'USER',
  })
  role: RolesEnum;

  @Column({
    default: 0,
  })
  secame_credit: number;

  @Column({
    default: 0,
  })
  secame_value: number;

  @Column({
    default: 0,
  })
  seca_coin: number;

  @Column({
    default: 100,
  })
  gord: number;

  @Column({
    default: 100,
  })
  diamond_paid: number;

  @Column({
    default: 1000,
  })
  diamond_free: number;

  @Column({
    default: 1000,
  })
  exp: number;

  @Column({
    default: 30,
  })
  battery: number;

  @Column({
    default: 1,
  })
  revive_coin: number;

  @Column({
    default: 1,
  })
  @Index({ unique: false })
  level: number;

  // @Column({
  //   type: 'json',
  //   nullable: false, // 기본값을 설정할 수 없으므로, nullable false 설정
  // })
  // linked_member_ids: string;

  // @Column({
  //   type: 'varchar',
  //   length: 50,
  //   nullable: false,
  // })
  // @Index()
  // provider: string; // 'google' 또는 'apple'

  // Google Member ID (가상 컬럼)
  // @Column({
  //   type: 'varchar', // 또는 'char' (UUID 사용 시)
  //   length: 255, // UUID 사용 시 '36'
  //   asExpression: `JSON_UNQUOTE(JSON_EXTRACT(linked_member_ids, '$[0].member_id'))`,
  //   generatedType: 'STORED',
  // })
  // @Index()
  // google_member_id_generated: string;

  // Apple Member ID (가상 컬럼)
  // @Column({
  //   type: 'varchar', // 또는 'char' (UUID 사용 시)
  //   length: 255,
  //   asExpression: `JSON_UNQUOTE(JSON_EXTRACT(linked_member_ids, '$[1].member_id'))`,
  //   generatedType: 'STORED',
  // })
  // @Index()
  // apple_member_id_generated: string;

  @Column({
    length: 128,
    type: 'varchar',
    default: '',
  })
  ban: string;

  @Column({
    length: 1,
    type: 'char',
    default: 'N',
  })
  prologue_yn: string;

  //"new" (신규 유저) "returning" (복귀 유저) "active" (일반 유저)
  @Column({
    length: 64,
    type: 'varchar',
    default: 'new',
  })
  account_type: string;

  // @Column({
  //   length: 128,
  //   default: '',
  // })
  // @Index({ unique: false })
  // uuid: string;
}

// @Column({
//   length: 20,
//   default: '',
// })
// @IsString({
//   message: stringValidatioMessage,
// })
// // @Length(1, 20, {
// //   message: '닉네임은 1~20자 사로 입력해주세요.',
// // })
// // @Length(1, 30, {
// //   message: lengthValidationMessage,
// // })
// //@Expose
// @Index({ unique: false })
// nickname: string;
