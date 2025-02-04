// src/transaction/transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../user/user.entity';
import { Asset } from '../asset/asset.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) {}

  async create(sellerId: number, buyerId: number, assetId: number): Promise<Transaction> {
    const seller = await this.userRepository.findOne({ where: { id: sellerId } });
    const buyer = await this.userRepository.findOne({ where: { id: buyerId } });
    const asset = await this.assetRepository.findOne({ where: { id: assetId } });

    const transaction = new Transaction();
    if (seller) transaction.seller = seller;
    if (buyer) transaction.buyer = buyer;
    transaction.sell_date = new Date();

    return this.transactionRepository.save(transaction);
  }
}