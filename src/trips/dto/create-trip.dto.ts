import { IsDateString, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateTripDto {

    @IsString()
    @IsNotEmpty()
    agencyId: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumberString()
    flightPrice: number;

    @IsNumberString()
    places: number;
}
