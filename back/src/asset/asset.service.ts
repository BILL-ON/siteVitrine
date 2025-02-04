// src/asset/asset.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(Asset)
        private assetRepository: Repository<Asset>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(asset: Partial<Asset>, userId: number): Promise<Asset> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            asset.user = user;
        }
        return this.assetRepository.save(asset);
    }

    async update(id: number, asset: Partial<Asset>, userId: number): Promise<Asset | null> {
        const existingAsset = await this.assetRepository.findOne({ where: { id }, relations: ['user'] });
        if (existingAsset) {
            if (existingAsset.user.id === userId) {
                await this.assetRepository.update(id, asset);
                return this.assetRepository.findOne({ where: { id } });
            }
        }
        return null;
    }

    async getAssets(userId: number): Promise<Asset[]> {
        return this.assetRepository.find({ where: { user: { id: userId } } });
    }

    async getAssetById(id: number): Promise<Asset | null> {
        return this.assetRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async buyAsset(id: number, buyerId: number): Promise<Asset | null> {
        const asset = await this.assetRepository.findOne({ where: { id }, relations: ['user'] });
        const buyer = await this.userRepository.findOne({ where: { id: buyerId } });

        if (asset && buyer) {
            const seller = asset.user;

            if (buyer.money >= asset.price) {
                buyer.money -= asset.price;
                seller.money += asset.price;
                asset.user = buyer;

                await this.userRepository.save(buyer);
                await this.userRepository.save(seller);
                await this.assetRepository.save(asset);

                return asset;
            }
        }
        return null;
    }
}