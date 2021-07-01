import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserGender } from '../types/user/user.types';
import { Gender } from './gender.entity';

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

  @OneToOne(() => Gender, (gender) => gender.type, { cascade: true })
  @JoinColumn()
  gender?: UserGender;
}
