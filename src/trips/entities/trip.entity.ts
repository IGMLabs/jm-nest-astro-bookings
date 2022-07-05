import { Booking } from "src/bookings/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity("trips")
export class Trip {
    @PrimaryColumn()
    id: string;

    @Column()
    destination: string;

    @Column({ type: "date" })
    startDate: Date;

    @Column({ type: "date" })
    endDate: Date;

    @Column({ type: "decimal" })
    price: number;

    @Column({ type: "int", default: 10 })
    places: number;

    @Column({ type: "timestamp", default: () => "now()"})
    createdAt: Date;

    @OneToMany(()=> Booking, (booking: Booking) => booking.trip, {cascade: true, eager: false})
    bookings: Booking[]
}