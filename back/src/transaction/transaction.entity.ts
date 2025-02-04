import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.soldTransactions)
  seller: User;

  @ManyToOne(() => User, user => user.boughtTransactions)
  buyer: User;

  @Column()
  sell_date: Date;
}