import { Trip } from "src/trips/entities/trip.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity("bookings")
export class Booking {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Trip)
    trip: Trip;

    @Column({nullable: true})
    passengerName: string;

    @Column({type: "int", nullable: true})
    luggageKilos: number;

    @Column({type: "boolean", nullable: true})
    hasPremiumFoodPrice: boolean;

    @Column({type: "int", default: 1})
    passengers: number;

    @Column({ type: "timestamp", default: () => "now()"})
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @OneToOne(() => Payment, (payment: Payment) => payment.booking, {eager: true, cascade: true})
    @JoinColumn()
    payment: Payment;
}
