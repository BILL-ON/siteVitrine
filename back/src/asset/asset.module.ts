import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { User } from '../user/user.entity'; // Import the User entity
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { UserModule } from '../user/user.module'; // Import the UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, User]), // Add Asset and User entities here
    forwardRef(() => UserModule), // Use forwardRef to avoid circular dependencies
  ],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService, TypeOrmModule.forFeature([Asset])], // Export AssetService and AssetRepository
})
export class AssetModule {}