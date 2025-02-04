import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { User } from '../user/user.entity';  
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { UserModule } from '../user/user.module'; 
@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, User]),
    forwardRef(() => UserModule), 
  ],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService, TypeOrmModule.forFeature([Asset])], 
})
export class AssetModule {}