import { Company } from 'src/domain/companys/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
    role: 'admin' | 'user';

    @ManyToOne(() => Company, company => company.users)
    company: Company;
}
