import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AssetModule } from './asset/asset.module';
import { TransactionModule } from './transaction/transaction.module';
import { Asset } from './asset/asset.entity';
import { Transaction } from './transaction/transaction.entity';
import { MsgController } from './msg.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Asset, Transaction],
      synchronize: true,
    }),
    
    UserModule,
    AssetModule,
    TransactionModule,
    
  ],
  controllers: [MsgController],

})
export class AppModule {}