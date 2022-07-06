import { IsBoolean, IsBooleanString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    tripId: string;

    @IsString()
    @IsNotEmpty()
    passengerName: string;

    @IsNumberString()
    luggageKilos: number;

    @IsBoolean()
    hasPremiumFoodPrice: boolean;

    @IsNumberString()
    passengers: number;
}

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    bookingId: string;

    @IsString()
    @IsNotEmpty()
    card: string;

    @IsNumber()
    amount: number;
}
