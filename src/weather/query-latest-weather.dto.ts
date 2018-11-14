import { ApiModelProperty } from '@nestjs/swagger';

export class QueryLatestWeatherDto {

    @ApiModelProperty({
        required: false,
        description: 'Limit results to a specific location'
    })
    readonly location: string;

}
