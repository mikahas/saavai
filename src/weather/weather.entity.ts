import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Weather {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar')
  location: string;

  @ManyToOne(type => User, user => user.drops)
  user: User;

  @Column('jsonb')
  data: any;

}
