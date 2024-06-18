import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, type FilterQuery, type Model } from 'mongoose';

import { League } from './league.schema';

export type LeaguesFilters = Partial<{
  name: string;
}>;

@Injectable()
export class LeaguesService {
  constructor(@InjectModel(League.name) private layerModel: Model<League>) {}

  async findAll(filters: LeaguesFilters) {
    const mongoFilter: FilterQuery<League> = {};
    if (filters.name) {
      mongoFilter.name = { $regex: filters.name, $options: 'i' };
    }

    return this.layerModel.find(mongoFilter).exec();
  }

  async findById(id: string) {
    try {
      return await this.layerModel.findById({ _id: id }).exec();
    } catch (error) {
      // Catch cast id errors, so it is handled as a not found
      if (error instanceof Error.CastError && error.path === '_id') {
        return null;
      }
      throw error;
    }
  }
}
