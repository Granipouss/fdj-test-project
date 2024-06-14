import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Model } from 'mongoose';

import { League } from './league.schema';

export type LeaguesFilters = Partial<{
  name: string;
}>;

@Injectable()
export class LeaguesService {
  constructor(@InjectModel(League.name) private layerModel: Model<League>) {}

  findAll(filters: LeaguesFilters) {
    const mongoFilter: FilterQuery<League> = {};
    if (filters.name) mongoFilter.name = { $regex: filters.name };

    return this.layerModel.find(mongoFilter).exec();
  }

  findById(id: string) {
    return this.layerModel.findById({ _id: id }).exec();
  }
}
