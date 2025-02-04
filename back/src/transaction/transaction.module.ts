import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../user/user.entity'; // Import the User entity
import { Asset } from '../asset/asset.entity'; // Import the Asset entity
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from '../user/user.module'; // Import the UserModule
import { AssetModule } from '../asset/asset.module'; // Import the AssetModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Asset]), // Add Transaction, User, and Asset entities here
    forwardRef(() => UserModule), // Use forwardRef to avoid circular dependencies
    forwardRef(() => AssetModule), // Use forwardRef to avoid circular dependencies
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService], // Export TransactionService if needed by other modules
})
export class TransactionModule {}