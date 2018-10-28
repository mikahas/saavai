import { ApiModelProperty } from '@nestjs/swagger';

// Token Data Transfer Object
export class TokenResponseDto {

    @ApiModelProperty()
    readonly token: string;

}
