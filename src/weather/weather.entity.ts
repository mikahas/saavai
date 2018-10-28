import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Weather {

  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiModelProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiModelProperty()
  @Column('varchar')
  location: string;

  @ApiModelProperty()
  @ManyToOne(type => User, user => user.drops)
  user: User;

  @ApiModelProperty()
  @Column('jsonb')
  data: any;

}
