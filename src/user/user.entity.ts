import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Weather } from '../weather/weather.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User {

  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  passwordHash: string;

  @ApiModelProperty()
  @Column('varchar')
  email: string;

  @ApiModelProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiModelProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiModelProperty()
  @OneToMany(type => Weather, weather => weather.user)
    drops: Weather[];

  @ApiModelProperty()
  @Column({ unique: true, type: 'varchar', default: '' })
  apiKey: string;

}
