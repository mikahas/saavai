import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.entity';

@Injectable()
export class WeatherService {

    constructor(
        @InjectRepository(Weather)
        private readonly weatherRepository: Repository<Weather>,
    ) {}

    async index(user: User): Promise<Weather[]> {
        return this.weatherRepository.find({
            where: { user },
            select: ['data', 'location']
        });
    }

    async create(drop: CreateDropDto, user: User): Promise<Weather> {
        const newDrop = this.weatherRepository.create(Object.assign(drop, { user }));
        return this.weatherRepository.save(newDrop);
      }
}
