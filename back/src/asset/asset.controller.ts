// src/asset/asset.controller.ts
import { Controller, Post, Body, Put, Param, Get, Req, UseGuards } from '@nestjs/common';
import { AssetService } from './asset.service';
import { Asset } from './asset.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() asset: Partial<Asset>, @Req() req): Promise<Asset> {
    return this.assetService.create(asset, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() asset: Partial<Asset>, @Req() req): Promise<Asset | null> {
    return this.assetService.update(id, asset, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAssets(@Req() req): Promise<Asset[]| null> {
    return this.assetService.getAssets(req.user.id);
  }

  @Get(':id')
  async getAssetById(@Param('id') id: number): Promise<Asset| null> {
    return this.assetService.getAssetById(id);
  }

  @Post('buy/:id')
  @UseGuards(AuthGuard('jwt'))
  async buyAsset(@Param('id') id: number, @Req() req): Promise<Asset| null> {
    return this.assetService.buyAsset(id, req.user.id);
  }
}