import { 
  IsNotEmpty,
  MaxLength,
  IsDefined,
  MinLength,
  IsNumber,
} from 'class-validator';

import { UserGender } from '../../types/user/user.types';

export enum UserMessage {
  INVALID_USER_NAME_REQUIRED = 'User name is required',
  INVALID_USER_NAME_MIN = 'User name must be minimum 4 characters long',
  INVALID_USER_NAME_MAX = 'User name must be maximum  100 characters long',
  INVALID_USER_AGE_TYPE = 'You must specify a number',
  INVALID_USER_AGE_REQUIRED = 'User age is required',
}

export class UserDto {
  id?: string;

  @MinLength(4, {
    message: UserMessage.INVALID_USER_NAME_MIN,
  })
  @MaxLength(100, {
    message: UserMessage.INVALID_USER_NAME_MAX,
  })
  @IsNotEmpty({
    message: UserMessage.INVALID_USER_NAME_REQUIRED,
  })
  @IsDefined()
  userName: string;

  gender: UserGender;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  age: number;
}
