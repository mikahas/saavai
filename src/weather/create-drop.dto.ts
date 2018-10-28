import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDropDto {

    @ApiModelProperty()
    readonly location: string;

    @ApiModelProperty()
    readonly data: object;

    readonly user: number;
}
