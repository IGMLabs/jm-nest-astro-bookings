import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CientDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    age?: number;
}