import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env['MONGO_HOST']}`, {
      dbName: process.env['MONGO_DATABASE'],
      user: process.env['MONGO_USER'],
      pass: process.env['MONGO_PASSWORD'],
    }),
    LeaguesModule,
    TeamsModule,
  ],
})
export class AppModule {}
