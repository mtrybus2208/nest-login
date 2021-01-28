import { UserGender } from '../../types/user/user.types';

export class UserDto {
  id?: string;
  userName: string;
  gender: UserGender;
  age: number;
}
