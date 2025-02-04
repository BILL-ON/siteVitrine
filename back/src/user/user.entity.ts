import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asset } from '../asset/asset.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  money: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Asset, asset => asset.user)
  assets: Asset[];

  @OneToMany(() => Transaction, transaction => transaction.seller)
  soldTransactions: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.buyer)
  boughtTransactions: Transaction[];
}