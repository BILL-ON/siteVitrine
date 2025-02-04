import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../user/user.entity';  
import { Asset } from '../asset/asset.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from '../user/user.module'; 
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Asset]), 
    forwardRef(() => UserModule), 
    forwardRef(() => AssetModule),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService], 
})
export class TransactionModule {}