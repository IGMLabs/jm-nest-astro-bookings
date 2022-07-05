import { Trip } from "src/trips/entities/trip.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("bookings")
export class Booking {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Trip)
    trip: Trip;

    @Column({nullable: false})
    client: string;

    @Column({type: "int", default: 1})
    passengers: number;

    @Column({ type: "timestamp", default: () => "now()"})
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}
