import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserGender } from '../types/user/user.types';

interface Message {
  [key: string]: string;
}

export const message: Message = {
  INVALID_USER_NAME_REQUIRED: 'User name is required',
  INVALID_USER_NAME_MIN: 'User name must be minimum 4 characters long',
  INVALID_USER_NAME_MAX: 'User name must be maximum  20 characters long',
  INVALID_USER_AGE_TYPE: 'You must specify a number',
  INVALID_USER_AGE_REQUIRED: 'User age is required',
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column('int')
  age: number;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;
}
