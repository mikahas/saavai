import { ApiModelProperty } from '@nestjs/swagger';

export class QueryWeatherIndexDto {

    @ApiModelProperty({
        required: false,
        enum: ['year', 'month', 'week', 'day', 'hour'],
        description: 'Time period range'
    })
    readonly range: string;

    @ApiModelProperty({
        required: false,
        description: 'Starting date where time period will be calculated. Default is now.'
    })
    readonly from: Date;

    @ApiModelProperty({
        required: false,
        description: 'Limit results to a specific location'
    })
    readonly location: string;

}
