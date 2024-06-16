import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, type Model } from 'mongoose';

import { Team } from './team.schema';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  findAll() {
    return this.teamModel.find().exec();
  }

  async findById(id: string) {
    try {
      return await this.teamModel.findById({ _id: id }).exec();
    } catch (error) {
      // Catch cast id errors, so it is handled as a not found
      if (error instanceof Error.CastError && error.path === '_id') {
        return null;
      }
      throw error;
    }
  }
}
