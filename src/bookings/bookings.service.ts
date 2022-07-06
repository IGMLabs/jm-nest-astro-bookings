import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UtilsService } from "src/core/utils/utils.service";
import { Trip } from "src/trips/entities/trip.entity";
import { Connection, EntityNotFoundError, Repository } from "typeorm";
import { CreateBookingDto, CreatePaymentDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";
import { Payment } from "./entities/payment.entity";

@Injectable()
export class BookingsService {

  private logger = new Logger("BookingsService");
  constructor(
    private utilsService: UtilsService,
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
    private connection: Connection,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const booking: Booking = this.bookingsRepository.create(createBookingDto);
    try {
      await queryRunner.startTransaction();
      const trip: Trip = await this.tripsRepository.findOneBy({ id: createBookingDto.tripId });
      this.bookTripPlaces(trip, createBookingDto, booking);
      await this.tripsRepository.save(trip);
      await this.bookingsRepository.save(booking);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      await queryRunner.rollbackTransaction();
      this.logger.error(dbError);
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return booking;
  }

  private bookTripPlaces(trip: Trip, createBookingDto: CreateBookingDto, booking: Booking) {
    if (!trip) throw new EntityNotFoundError(Trip, createBookingDto.tripId);
    if (trip.places < createBookingDto.passengers) throw new Error("BUSINESS: Not enough places");
    trip.places -= createBookingDto.passengers;
    trip.updatedAt = new Date();
    booking.id = this.utilsService.createGUID();
    booking.trip = trip;
  }

  // eslint-disable-next-line max-lines-per-function
  public async payBooking(createPaymentDto: CreatePaymentDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const payment: Payment = this.paymentsRepository.create(createPaymentDto);
    try {
      await queryRunner.startTransaction();
      const booking: Booking = await this.bookingsRepository.findOneBy([{ id: createPaymentDto.bookingId }]);
      //this.processPayment(booking, payment);
      payment.id = this.utilsService.createGUID();
      booking.payment = payment;
      await this.bookingsRepository.save(booking);
      await this.paymentsRepository.save(payment);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      await queryRunner.rollbackTransaction();
      this.logger.error(dbError);
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return;
  }

  private processPayment(booking: Booking, payment: Payment){
    const price = booking.trip.price * booking.passengers;
    if(price > payment.amount) throw new Error("BUSINESS: Not enough money");
    booking.payment = payment;
    booking.id = this.utilsService.createGUID();
  }

  async findAll() {
    return await this.bookingsRepository.find({ relations: {trip: true}});
  }

  async findOne(id: string) {
    const booking = await this.bookingsRepository.findOne({
      where: { id: id },
      relations: { payment: true },
    });
    if (!booking) throw new EntityNotFoundError(Booking, id);
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);
    const updated = {
      ...booking,
      ...updateBookingDto,
    };
    return await this.bookingsRepository.save(updated);
  }

  async remove(id: string) {
    const booking = await this.findOne(id);
    return await this.bookingsRepository.remove(booking);
  }
}