import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    get name() {
        return `${this.firstname} ${this.lastname}`;
    }

    @DeleteDateColumn()
    deletedDate: Date;
}
