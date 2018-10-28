import { ApiModelProperty } from '@nestjs/swagger';

// Data Transfer Object
export class CreateDropDto {

    @ApiModelProperty()
    readonly location: string;

    @ApiModelProperty()
    readonly data: object;

    readonly user: number;
}
