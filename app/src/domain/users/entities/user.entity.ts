import { Company } from 'src/domain/companies/entities/company.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
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

  // indica se MFA esta ativo
  @Column({ type: 'boolean', default: false })
  mfa: boolean;

  // segredo base32 usado para gerar/verificar códigos TOTP
  @Column({ nullable: true })
  mfaSecret?: string;

  @Column({ type: 'timestamp', nullable: true })
  mfaEnabledAt?: Date;

  @ManyToOne(() => Company, (company) => company.users, { onDelete: 'CASCADE' })
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
