import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Weather } from '../weather/weather.entity';

@Entity()
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  passwordHash: string;

  @Column('varchar')
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Weather, weather => weather.user)
    drops: Weather[];

}
