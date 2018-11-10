import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.entity';
import * as moment from 'moment';

@Injectable()
export class WeatherService {

    constructor(
        @InjectRepository(Weather)
        private readonly weatherRepository: Repository<Weather>,
    ) {}

    async index(user: User, range: string, fromDate: string | Date = new Date()): Promise<Weather[]> {
        let start = moment(fromDate);
        let end = moment(fromDate);

        if (!start.isValid()) throw new Error('Invalid from date');

        switch (range) {
            // TODO: filter results for year, month and week, calculate min/max for each month/day
            // case 'year': start = start.subtract(1, 'years'); break;
            // case 'month': start = start.subtract(1, 'months'); break;
            case 'week': start = start.subtract(7, 'days'); break;
            case 'hour': start = start.subtract(1, 'hours'); break;
            case 'day':
            default: start = start.subtract(24, 'hours');
        }

        return this.weatherRepository.createQueryBuilder('weather')
            .where({ user })
            .andWhere('weather.createdAt > :start', {
                start: start.format(moment.HTML5_FMT.DATETIME_LOCAL_MS).toString()
            })
            .andWhere('weather.createdAt <= :end', {
                end: end.format(moment.HTML5_FMT.DATETIME_LOCAL_MS).toString()
            })
            .getMany();
    }

    async create(drop: CreateDropDto, user: User): Promise<Weather> {
        const newDrop = this.weatherRepository.create(Object.assign(drop, { user }));
        return this.weatherRepository.save(newDrop);
      }
}
