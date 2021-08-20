import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'c_salary_standard' })
export class SalaryStandard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    salaryGrade: number;

    @Column({ type: 'decimal' })
    amount: number;
}
