import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserGender } from '../types/user/user.types';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  type: UserGender;
}
