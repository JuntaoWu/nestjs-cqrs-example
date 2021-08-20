import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
    @ApiProperty({ example: 'Lei' })
    firstname: string;
    @ApiProperty({ example: 'Li' })
    lastname: string;
}
