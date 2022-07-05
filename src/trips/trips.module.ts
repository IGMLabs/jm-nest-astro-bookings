import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { Trip } from './entities/trip.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Trip, Booking])],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
