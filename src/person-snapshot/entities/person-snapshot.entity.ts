import { Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("person_snapshot")
export class PersonSnapshot {
    @PrimaryColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ type: 'integer', default: 1 })
    salaryGrade: number;

    @Column({ type: 'decimal', default: 0 })
    salaryTotal: number;

    get name() {
        return `${this.firstname} ${this.lastname}`;
    }

    @DeleteDateColumn()
    deletedDate: Date;

    @Column()
    personId: string;
}
