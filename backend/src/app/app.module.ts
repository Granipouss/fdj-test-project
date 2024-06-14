import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Player, PlayerSchema } from './player.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env['MONGO_HOST']}`, {
      dbName: process.env['MONGO_DATABASE'],
      user: process.env['MONGO_USER'],
      pass: process.env['MONGO_PASSWORD'],
    }),
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
