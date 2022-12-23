import { IsString, MinLength } from 'class-validator';

export class CreateEventDto {

    @IsString()
    @MinLength(1)
    message: string;
}
