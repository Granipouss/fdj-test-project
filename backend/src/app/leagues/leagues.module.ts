import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { League, LeagueSchema } from './league.schema';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 600 * 60 * 1e3 }),
    MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }]),
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
