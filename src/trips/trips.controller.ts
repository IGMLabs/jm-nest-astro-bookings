import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from "@nestjs/common";
import { PostgresErrorFilter } from "src/core/filters/postgres-error.filter";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { Trip } from "./entities/trip.entity";
import { TripsService } from "./trips.service";

@Controller("trips")
@UseFilters(PostgresErrorFilter)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tripsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tripsService.remove(id);
  }
}