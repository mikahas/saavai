import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { CreateDropDto } from './create-drop.dto';
import { User } from 'user/user.entity';
import * as moment from 'moment';
import { QueryWeatherIndexDto } from './query-weather-index.dto';
import { map } from 'lodash';

export interface LatestWhere { user: User, location?: string };

@Injectable()
export class WeatherService {

    constructor(
        @InjectRepository(Weather)
        private readonly weatherRepository: Repository<Weather>,
    ) {}

    async index( user: User, query: QueryWeatherIndexDto): Promise<Weather[]> {
        let start = moment(query.from);
        let end = moment(query.from);

        if (!start.isValid()) throw new Error('Invalid from date');

        switch (query.range) {
            // TODO: filter results for year, month and week, calculate min/max for each month/day
            // case 'year': start = start.subtract(1, 'years'); break;
            // case 'month': start = start.subtract(1, 'months'); break;
            case 'week': start = start.subtract(7, 'days'); break;
            case 'hour': start = start.subtract(1, 'hours'); break;
            case 'day':
            default: start = start.subtract(24, 'hours');
        }

        let dbQuery = this.weatherRepository.createQueryBuilder('weather')
            .where({ user })
            .andWhere('weather.createdAt > :start', {
                start: start.format(moment.HTML5_FMT.DATETIME_LOCAL_MS).toString()
            })
            .andWhere('weather.createdAt <= :end', {
                end: end.format(moment.HTML5_FMT.DATETIME_LOCAL_MS).toString()
            });
        if (query.location) dbQuery = dbQuery.andWhere('weather.location = :location',
        { location: query.location });
        return dbQuery.getMany();
    }

    async create(drop: CreateDropDto, user: User): Promise<Weather> {
        const newDrop = this.weatherRepository.create(Object.assign(drop, { user }));
        return this.weatherRepository.save(newDrop);
    }

    async locations(user: User): Promise<string[]> {
        return this.weatherRepository.createQueryBuilder('weather')
            .select('DISTINCT location')
            .where({ user })
            .getRawMany()
            .then(results => map(results, result => result.location));
    }

    async latest(user: User, location: string = null): Promise<Weather[]> {
        let where: LatestWhere = { user };
        if (location) where.location = location;
        return this.weatherRepository.createQueryBuilder('weather')
            .where(where)
            .select('DISTINCT ON (location) id, "weather"."createdAt", "weather"."updatedAt", location, data, "weather"."userId"')
            .orderBy('location, "weather"."createdAt"', 'DESC')
            .getRawMany();
    }
}
