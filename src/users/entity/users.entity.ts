import {
  Column,
  Double,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import {
  IsEmail,
  IsString,
  Length,
  ValidationArguments,
} from 'class-validator';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidatioMessage } from 'src/common/validation-message/string-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { Exclude, Expose } from 'class-transformer';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Exclude()
export class UsersModel extends BaseModel {
  @Column({
    length: 20,
  })
  @IsString({
    message: stringValidatioMessage,
  })
  // @Length(1, 20, {
  //   message: '닉네임은 1~20자 사로 입ㅕ해주세요.',
  // })
  @Length(1, 30, {
    message: lengthValidationMessage,
  })
  //@Expose()
  @Index({ unique: true })
  nickname: string;

  @Column({
    length: 512,
  })
  @IsString({
    message: stringValidatioMessage,
  })
  //@Index({ unique: true })
  device_id: string;

  @Column({
    length: 512,
  })
  @IsString({
    message: stringValidatioMessage,
  })
  //@Index({ unique: true })
  pgs_id: string;

  @Column({
    length: 1,
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
  @Index({ unique: true })
  email: string;

  @Column()
  @IsString({
    message: stringValidatioMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  /**
   * request
   * frontend -> backend
   * plain object (JSON) -> class instance (dto)
   *
   * Response
   * backend -> frontend
   * class instance (dto) -> plain object (JSON)
   *
   * toClassOnly -> class instance로 변환될때만
   * toPlainOnly -> plain object로 변환될때만
   */
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
    default: 0,
  })
  level: number;

  //test
  // @Expose()
  // get nicknameAndEmail() {
  //   return this.nickname + '/' + this.email;
  // }
}
