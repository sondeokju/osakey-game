import { ValidationArguments } from 'class-validator';

export const stringValidatioMessage = (args: ValidationArguments) => {
  return `${args.property}에 String을 입력해주새요!`;
};
