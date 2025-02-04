// src/transaction/transaction.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: { sellerId: number; buyerId: number; assetId: number }, @Req() req): Promise<any> {
    return this.transactionService.create(body.sellerId, body.buyerId, body.assetId);
  }
}